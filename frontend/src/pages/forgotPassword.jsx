import { useState } from 'react';
import { useForgotPasswordMutation } from '@/features/auth/authApi';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { Mail, ArrowRight, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validateEmail = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      await forgotPassword(email).unwrap();
      navigate('/verify-email-notice');
    } catch (err) {
      setErrors({
        apiError: err.data?.message || 'Something went wrong.',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                Forgot Password
              </h2>
              <KeyRound className="h-10 w-10 text-white opacity-75" />
            </div>
            <p className="text-blue-100 mt-2">
              We'll send you a link to reset your password
            </p>
          </div>
          
          <div className="p-8">
            {errors.apiError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{errors.apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    required
                    className={`pl-10 pr-3 py-2 block w-full rounded-xl border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-3 px-4 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>

            <div className="mt-8 flex justify-center">
              <Link
                to="/auth/login"
                className="text-blue-600 hover:text-blue-500 font-medium flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
            
            <div className="mt-6 px-6 py-4 bg-blue-50 rounded-xl">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Can't receive the email?</h3>
              <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                <li>Check your spam or junk folder</li>
                <li>Make sure you've entered the correct email</li>
                <li>Allow emails from our domain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
