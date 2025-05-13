import { useLazyVerifyEmailQuery } from '@/features/auth/authApi';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [triggerVerify, { isSuccess, isError, error }] =
    useLazyVerifyEmailQuery();

  useEffect(() => {
    if (token) {
      triggerVerify(token);
    } else {
      toast.error('Missing token in URL');
      navigate('/auth/login');
    }
  }, [token, triggerVerify, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully!');
      navigate('/auth/login');
    }
    if (isError) {
      const errMsg = error?.data?.message || 'Verification failed';
      toast.error(errMsg);
      navigate('/auth/login');
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Verifying your email...</p>
    </div>
  );
};

export default VerifyEmail;
