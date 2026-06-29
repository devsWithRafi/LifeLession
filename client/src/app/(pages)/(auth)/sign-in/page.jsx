import NavLogo from '@/components/NavLogo';
import SignInForm from './SignInForm';

export default function SignInPage() {
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
          <NavLogo className={'w-40 absolute top-3 left-3'} />
          {/* Decorative blob */}
          <div
            className="absolute top-6 right-6 w-36 h-36 rounded-full opacity-20 blur-3xl"
            style={{ background: '#3ecf8e' }}
          />

          {/* Heading */}
          <div className="mt-auto mb-6">
            <h1 className="text-white text-3xl font-semibold leading-tight tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/60 text-sm mt-2 max-w-[80%] leading-relaxed">
              Complete these fields to sign in to your account.
            </p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <SignInForm />
      </div>
    </div>
  );
}
