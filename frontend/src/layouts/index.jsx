import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';
import Container from '@/components/container';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Outlet } from 'react-router';
import { headerHeight } from '@/constants';

const Layout = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data, accessToken: null }));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container 
        elem="main" 
        className="flex-grow pt-[90px] pb-8"
      >
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
