'use client';

import { uploadImage } from '@/actions/helpers/uploadImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import { cn } from '@/lib/utils';
import { Camera, Lock } from 'lucide-react';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const UserProfileUpdateModal = ({ open, setOpen }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const fileRef = useRef(null);
  const [displayName, setDisplayName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [profileEditPending, startProfileEditPending] = useTransition();

  useEffect(() => {
    const loadPrevData = () => {
      setAvatarPreview(user?.image);
      setDisplayName(user?.name);
      setUserBio(user?.bio);
    };
    loadPrevData();
  }, [open]);

  function handleAvatarPick(e) {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  }

  function handleSave() {
    startProfileEditPending(async () => {
      if (!displayName) {
        toast.error('user name cant be empty!');
      } else {
        const payload = {
          name: displayName,
          image: user?.image,
          bio: userBio,
        };

        const imageFile = fileRef.current?.files[0];
        if (imageFile) {
          const image = await uploadImage(imageFile);
          if (!image) {
            toast.error('Image upload failed');
            return;
          }
          payload.image = url;
        }
        await authClient.updateUser({
          ...payload,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Profile info changed successfully');
              setOpen(false);
            },
            onError: (ctx) =>
              toast.error(ctx.error.message ?? 'An error occurred!'),
          },
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <DialogContent
          className={cn('sm:max-w-md rounded-2xl gap-0 p-0 overflow-hidden')}
        >
          <DialogHeader className="px-6 py-4">
            <DialogTitle className="text-base font-semibold">
              Edit profile
            </DialogTitle>
          </DialogHeader>

          <Separator />

          <div className="px-6 py-5 space-y-6">
            {/* Avatar picker */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar className="w-20 h-20 text-lg shadow">
                  <AvatarImage src={avatarPreview} alt="profile" />
                  <AvatarFallback className="text-lg font-semibold">
                    {fallBackNameFormat(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow border-2 border-background hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarPick}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 rounded-lg"
                onClick={() => fileRef.current?.click()}
              >
                Change photo
              </Button>
            </div>

            {/* Name field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="display-name"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Display name
              </Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="rounded-md"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>

            {/* Bio field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="bio"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Bio
              </Label>
              <Input
                id="bio"
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                placeholder="Your bio"
                className="rounded-md"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>

            {/* Email — read only */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                Email <Lock className="w-3 h-3" />
              </Label>
              <Input
                value={user?.email}
                readOnly
                disabled
                className="rounded-xl opacity-60 cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Email can&apos;t be changed here.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex p-5 gap-2 font-poppins items-center justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full font-sans"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              className="rounded-full font-sans"
              onClick={handleSave}
              disabled={!displayName || profileEditPending}
            >
              {profileEditPending ? (
                <>
                  <Spinner /> Saving...
                </>
              ) : (
                <>Save changes</>
              )}
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UserProfileUpdateModal;
