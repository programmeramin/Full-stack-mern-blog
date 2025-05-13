import { cn } from '@/lib/utils';
import { ArrowLeft, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';

const SearchInput = ({
  onSearch = query => console.log('Search query:', query),
}) => {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div className="lg:w-full relative">
      <MobileSearch value={value} onChange={setValue} onSubmit={handleSubmit} />
      <DesktopSearch
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

const DesktopSearch = ({ value, onChange, onSubmit }) => {
  return (
    <div className="hidden relative lg:block w-full">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search..."
        className={cn(
          'w-full px-4 py-2 rounded-full border border-input',
          'bg-background text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
        )}
        onKeyDown={e => e.key === 'Enter' && onSubmit(e)}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className={cn(
          'rounded-full absolute top-1/2 -translate-y-1/2 right-0 size-9'
        )}
      >
        <Search />
      </Button>
    </div>
  );
};

const MobileSearch = ({ value, onChange, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="lg:hidden">
      <div
        className={cn(
          'fixed top-16 inset-x-0 bg-background z-50 shadow-md',
          'flex items-center px-4 py-3 border-b',
          'transition-all duration-300 ease-in-out',
          open
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <form
          onSubmit={onSubmit}
          className="relative w-full flex items-center gap-2"
        >
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
            type="button"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <input
            ref={inputRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Search..."
            className={cn(
              'w-full px-4 py-2 rounded-full border border-input',
              'bg-background text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
            )}
            onKeyDown={e => e.key === 'Enter' && onSubmit(e)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className={cn(
              'rounded-full absolute top-1/2 -translate-y-1/2 right-0 size-9'
            )}
          >
            <Search />
          </Button>
        </form>
      </div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="outline"
        size="icon"
        className={cn('rounded-full')}
      >
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput; 