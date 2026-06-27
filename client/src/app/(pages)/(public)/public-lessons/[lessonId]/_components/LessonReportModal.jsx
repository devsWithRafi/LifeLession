'use client';

import { useState, useTransition } from 'react';
import {
  Flag,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { lessonReports } from '@/lib/dummy-data/lessonReports';
import { useReport } from '@/context/report-context/ReportContextProvider';

const MAX_DETAILS = 500;

export default function LessonReportModal({ open, onClose, lesson }) {
  const [step, setStep] = useState('select'); // wizard step
  const [selectedReason, setSelectedReason] = useState(null);
  const [details, setDetails] = useState('');
  const { handleAddReport } = useReport();
  const [loading, startLoading] = useTransition();

  function reset() {
    setStep('select');
    setSelectedReason(null);
    setDetails('');
  }

  function handleClose() {
    reset();
    onClose();
  }

  const handleSubmit = () => {
    const payload = {
      lessonId: lesson._id,
      reportedUserEmail: lesson.author?.email ?? '',
      reason: selectedReason.key,
      details: details.trim(),
    };
    try {
      startLoading(async () => {
        const success = await handleAddReport(payload);
        if (success) setStep('success');
        else setStep('error');
      });
    } catch {
      setStep('error');
    }
  };

  const charsLeft = MAX_DETAILS - details.length;
  const needsDetails = selectedReason?.key === 'other';

  // ── Render steps ────────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="min-w-lg gap-0 p-0 overflow-hidden"
        onInteractOutside={(e) => {
          // Prevent accidental close mid-flow
          if (step === 'select' || step === 'success' || step === 'error')
            return;
          e.preventDefault();
        }}
      >
        {/* ── Header band ── */}
        <div className="flex items-start gap-3 px-6 pt-6 pb-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Flag className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-base leading-snug">
              {step === 'success' ? 'Report submitted' : 'Report this lesson'}
            </DialogTitle>
            <DialogDescription className="text-xs mt-0.5 leading-relaxed line-clamp-1">
              {step === 'success' ? (
                'Thanks for helping keep the community safe.'
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {lesson.title}
                  </span>{' '}
                  · by {lesson.author?.name}
                </>
              )}
            </DialogDescription>
          </div>
        </div>

        <Separator />

        {/* ══ STEP: SELECT REASON ══════════════════════════════════════════════ */}
        {step === 'select' && (
          <div className="px-6 py-4 space-y-2">
            <p className="text-xs text-muted-foreground mb-3">
              Why are you reporting this lesson? Your report is anonymous.
            </p>

            <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1 -mr-1">
              {lessonReports.map((reason) => (
                <button
                  key={reason.key}
                  onClick={() => {
                    setSelectedReason(reason);
                    setStep('details');
                  }}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors group
                    hover:border-red-300 hover:bg-red-50/50 dark:hover:border-red-700 dark:hover:bg-red-900/10
                    ${
                      selectedReason?.key === reason.key
                        ? 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                        : 'border-border bg-transparent'
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{reason.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {reason.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ STEP: DETAILS ════════════════════════════════════════════════════ */}
        {step === 'details' && (
          <div className="px-6 py-4 space-y-4">
            {/* Selected reason pill */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('select')}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                ← Change
              </button>
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0"
              >
                {selectedReason?.label}
              </Badge>
            </div>

            {/* Details textarea */}
            <div className="space-y-1.5">
              <Label htmlFor="report-details" className="text-sm">
                Additional details{' '}
                {!needsDetails && (
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                )}
              </Label>
              <Textarea
                id="report-details"
                rows={4}
                maxLength={MAX_DETAILS}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  needsDetails
                    ? 'Please describe the issue in detail…'
                    : 'Add any context that might help our review team…'
                }
                className="resize-none text-sm max-w-full h-25"
              />
              <p
                className={`text-xs text-right tabular-nums ${charsLeft < 50 ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                {charsLeft} characters left
              </p>
            </div>

            {/* Info note */}
            <div className="rounded-md bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
              Reports are reviewed within 48 hours. Repeated false reports may
              affect your account standing.
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep('select')}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
                disabled={needsDetails && details.trim().length < 10}
                onClick={() => setStep('confirm')}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* ══ STEP: CONFIRM ════════════════════════════════════════════════════ */}
        {step === 'confirm' && (
          <div className="px-6 py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Review your report before sending.
            </p>

            {/* Summary card */}
            <div className="rounded-lg border bg-muted/40 divide-y divide-border text-sm">
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  Lesson
                </span>
                <span className="font-medium line-clamp-2 leading-snug">
                  {lesson.title}
                </span>
              </div>
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  Author
                </span>
                <span>{lesson.author?.name}</span>
              </div>
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  Reason
                </span>
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0 -mt-0.5"
                >
                  {selectedReason?.label}
                </Badge>
              </div>
              {details.trim() && (
                <div className="flex items-start gap-3 px-4 py-3">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                    Details
                  </span>
                  <span className="text-muted-foreground leading-relaxed line-clamp-3">
                    {details.trim()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={() => setStep('details')}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Flag className="h-4 w-4 mr-2" />
                    Submit report
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ══ STEP: SUCCESS ════════════════════════════════════════════════════ */}
        {step === 'success' && (
          <div className="px-6 py-8 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                We&apos;ve received your report
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
                Our team will review it within 48 hours. You won&apos;t receive
                individual updates unless we need more information.
              </p>
            </div>
            <Button className="mt-2 w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}

        {/* ══ STEP: ERROR ══════════════════════════════════════════════════════ */}
        {step === 'error' && (
          <div className="px-6 py-8 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Something went wrong</p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
                Your report couldn&apos;t be sent. Check your connection and try
                again.
              </p>
            </div>
            <div className="flex gap-2 w-full mt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
                onClick={() => {
                  setStep('confirm');
                  handleSubmit();
                }}
              >
                Try again
              </Button>
            </div>
          </div>
        )}

        {/* ── Bottom padding ── */}
        {(step === 'select' || step === 'details' || step === 'confirm') && (
          <div className="px-6 pb-5" />
        )}
      </DialogContent>
    </Dialog>
  );
}
