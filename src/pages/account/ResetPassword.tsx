import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { usePageTitle } from '@/hooks/use-page-title';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { friendlyErrorMessage } from '@/lib/error-messages';

type Phase = 'verifying' | 'ready' | 'invalid';

export default function ResetPassword() {
  usePageTitle('Reset Password');
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('verifying');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Supabase's detectSessionInUrl parses the recovery token from the URL hash
    // automatically and fires either INITIAL_SESSION (with the recovery session)
    // or PASSWORD_RECOVERY. We accept either as proof we have a valid session.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'PASSWORD_RECOVERY' || (event === 'INITIAL_SESSION' && session)) {
        setPhase('ready');
      } else if (event === 'SIGNED_OUT') {
        setPhase('invalid');
      }
    });

    // Fallback: if auth-state never fires (link expired or already consumed),
    // check after a short delay and downgrade to invalid.
    const timer = setTimeout(async () => {
      if (!mounted) return;
      const { data } = await supabase.auth.getSession();
      setPhase((p) => (p === 'verifying' ? (data.session ? 'ready' : 'invalid') : p));
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timer);
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success('Password updated. Please sign in.');
      await supabase.auth.signOut();
      navigate('/account/login');
    } catch (err) {
      toast.error(friendlyErrorMessage(err, 'Could not update password. The reset link may have expired.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-chrome mb-2">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Choose a new password for your account
          </p>
        </div>

        {phase === 'verifying' && (
          <div className="flex flex-col items-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground mt-4">Verifying recovery link…</p>
          </div>
        )}

        {phase === 'invalid' && (
          <div className="text-center py-8 space-y-4">
            <p className="text-sm text-foreground">
              This recovery link is invalid or has expired.
            </p>
            <p className="text-xs text-muted-foreground">
              Recovery links expire after 1 hour. Request a new one from the sign-in page.
            </p>
            <Button
              onClick={() => navigate('/account/login')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Back to Sign In
            </Button>
          </div>
        )}

        {phase === 'ready' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pl-10 pr-10 bg-card border-border"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type={show ? 'text' : 'password'}
                  placeholder="Re-enter the new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={8}
                  className="pl-10 bg-card border-border"
                />
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={submitting || password.length < 8 || password !== confirm}
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              {submitting ? 'Updating…' : 'Update password'}
            </Button>
          </form>
        )}
      </div>
    </StorefrontLayout>
  );
}
