import React from 'react';
import Container from '../container';
import Logo from '../logo';
import NavLinks from './navLinks';
import SearchInput from './searchInput';
import { ThemeToggler } from './themeToggler';
import { buttonVariants } from '../ui/button';
import { Edit } from 'lucide-react';
import MobileSidebar from './mobileSidebar';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { UserButton } from '../userButton';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  const isAuthPage = pathname.includes('auth');
  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] border-b bg-background/95 backdrop-blur-sm z-50 shadow-sm">
      <Container className="flex h-full items-center justify-between gap-14">
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <Logo />
        </div>
        <div className="flex gap-4 w-full justify-end items-center">
          {!isAuthPage && <SearchInput />}
          <NavLinks />
          {user ? (
            <Link to="/create-post" className={buttonVariants()}>
              Write <Edit className="size-4" />{' '}
            </Link>
          ) : (
            <Link to="/auth/login" className={cn(buttonVariants())}>
              Login
            </Link>
          )}
          <ThemeToggler className="hidden sm:flex" />
          {user && <UserButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
