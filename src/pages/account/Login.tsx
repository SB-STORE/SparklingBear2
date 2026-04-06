import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const isPhone = /^[6-9]\d{9}$/.test(identifier.replace(/\s/g, ''));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let email = identifier;

      // If user entered a phone number, look up their email
      if (isPhone) {
        const phone = identifier.replace(/\s/g, '');
        const { data: customers } = await supabase
          .from('customers')
          .select('email')
          .eq('phone', phone)
          .limit(1);

        if (customers && customers.length > 0 && customers[0].email) {
          email = customers[0].email;
        } else {
          throw new Error('No account found with this phone number. Please use your email to sign in.');
        }
      }

      await signIn(email, password);
      toast.success('Welcome back!');
      navigate('/account');
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setForgotLoading(true);
    try {
      await resetPassword(forgotEmail);
      toast.success('Password reset link sent to your email!');
      setShowForgot(false);
      setForgotEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Could not send reset link');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      toast.error(err.message || 'Google sign-in failed');
    }
  };

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-chrome mb-2">Sign In</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back to Sparkling Bear
          </p>
        </div>

        {/* Google Sign In */}
        <Button
          variant="outline"
          className="w-full mb-4 border-border hover:bg-muted"
          onClick={handleGoogleSignIn}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        <div className="relative mb-4">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
            or sign in with credentials
          </span>
        </div>

        {/* Email/Phone + Password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or Phone Number</Label>
            <div className="relative">
              {isPhone ? (
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                id="identifier"
                type="text"
                placeholder="your@email.com or 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="pl-10 bg-card border-border"
              />
            </div>
            {isPhone && (
              <p className="text-xs text-muted-foreground">
                We'll look up the email linked to this phone number
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/account/register" className="text-primary font-semibold hover:underline">
            Create one
          </Link>
        </p>

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowForgot(false)}>
            <div className="bg-background border border-border rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-foreground mb-2">Reset Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="bg-card border-border"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowForgot(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? 'Sending...' : 'Send Link'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StorefrontLayout>
  );
}
