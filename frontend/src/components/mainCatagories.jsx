import React from 'react';
import { Link, useLocation } from 'react-router';

const MainCategories = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentCat = params.get('cat') || '';

  const categories = [
    { label: 'All Posts', value: '', className: 'bg-blue-800 text-white' },
    { label: 'Web Design', value: 'web-design', icon: '🎨' },
    { label: 'Development', value: 'development', icon: '💻' },
    { label: 'Database', value: 'database', icon: '🗄️' },
    { label: 'Search Engines', value: 'seo', icon: '🔍' },
    { label: 'Marketing', value: 'marketing', icon: '📈' },
  ];

  return (
    <div>
      {/* Desktop Categories */}
      <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-2 p-4">
          {categories.map(cat => {
            const isActive = currentCat === cat.value;
            return (
              <Link
                key={cat.label}
                to={cat.value ? `/?cat=${cat.value}` : '/'}
                className={`
                  flex items-center gap-2 rounded-full px-5 py-2.5 transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-800 text-white shadow-md' 
                    : 'hover:bg-blue-50 text-gray-700 border border-gray-100'
                  }
                `}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span className="font-medium">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Categories */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex items-center gap-3 min-w-max">
          {categories.map(cat => {
            const isActive = currentCat === cat.value;
            return (
              <Link
                key={cat.label}
                to={cat.value ? `/?cat=${cat.value}` : '/'}
                className={`
                  flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-800 text-white shadow-sm' 
                    : 'bg-white hover:bg-blue-50 text-gray-700 border border-gray-100 shadow-sm'
                  }
                `}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span className="font-medium">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
