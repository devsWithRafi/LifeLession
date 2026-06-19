import SignUpForm from './SignUpForm';
import NavLogo from '@/components/NavLogo';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <div className="w-full max-w-[1000px] flex rounded-xl overflow-hidden shadow-2xl p-3 bg-card min-h-[70vh]">
        {/* ── Left Panel ── */}
        <div
          className="hidden md:flex md:w-[50%] flex-col justify-between p-8 relative rounded"
          style={{
            background:
              'radial-gradient(ellipse at 60% 30%, #1e6b52 0%, #0d3d2e 55%, #071e17 100%)',
          }}
        >
          <NavLogo className={'w-40 absolute top-3 left-3'}/>
          {/* Decorative blob */}
          <div
            className="absolute top-6 right-6 w-36 h-36 rounded-full opacity-20 blur-3xl"
            style={{ background: '#3ecf8e' }}
          />

          {/* Heading */}
          <div className="mt-auto mb-6">
            <h1 className="text-white text-3xl font-semibold leading-tight tracking-tight">
              Get Started
              <br />
              with Us
            </h1>
            <p className="text-white/60 text-sm mt-2 max-w-[80%] leading-relaxed">
              Complete these easy steps to register your account.
            </p>
          </div>

          {/* Steps */}
          <div className="flex gap-3">
            {[
              { num: 1, label: 'Sign up your account', active: true },
              { num: 2, label: 'Set up your workspace', active: false },
              { num: 3, label: 'Set up your profile', active: false },
            ].map((step) => (
              <div
                key={step.num}
                className={`flex-1 rounded-lg p-3 text-xs ${
                  step.active
                    ? 'bg-white text-[#0d3d2e]'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold mb-2 ${
                    step.active
                      ? 'bg-[#0d3d2e] text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {step.num}
                </span>
                <p className="font-medium leading-snug">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel ── */}
        <SignUpForm />
      </div>
    </div>
  );
}
