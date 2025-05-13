import { placeholderUserImage } from '@/constants';
import { cn } from '@/lib/utils';
import { LogOut, User2, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { buttonVariants } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useLogoutMutation } from '@/features/auth/authApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '@/features/auth/authSlice';

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { user } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
      dispatch(
        setCredentials({
          user: null,
        })
      );
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const dropdownItems = [
    {
      label: 'Profile',
      icon: User2,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      onClick: () => navigate('/Dashboard'),
    },
    {
      label: 'Logout',
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'group',
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
            className: 'size-11 !rounded-full',
          })
        )}
      >
        <span className="relative overflow-hidden size-9 rounded-full">
          <img
            src={user?.imageUrl || placeholderUserImage}
            alt="Avatar"
            className="rounded-full"
          />
          <span className="absolute top-0 block h-full w-1 -rotate-[25deg] bg-white blur-[1.7px] -left-2 group-hover:left-[105%] transition-all duration-300" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]" align="end">
        <div className="flex items-center gap-3">
          <img
            src={user?.imageUrl || placeholderUserImage}
            alt="Avatar"
            className="rounded-full min-w-12 size-12 object-cover"
          />
          <div className="text-sm">
            <p className="line-clamp-1">{user?.email || 'Loading...'}</p>
            <p className="leading-4 text-muted-foreground">@{user?.username || 'user'}</p>
          </div>
        </div>
        <ul className="flex flex-col pt-3">
          {dropdownItems.map(({ label, icon, onClick }) => {
            const Icon = icon;
            return (
              <li
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                key={label}
                role="button"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'text-foreground/70 hover:text-foreground/70 hover:bg-secondary/50 justify-start'
                )}
              >
                <Icon className="text-muted-foreground size-4" />
                {label}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}; 