import React from 'react';

const SideMenu = ({ onFilterChange }) => {
  const handleCategoryClick = cat => {
    onFilterChange({ cat, sort: null });
  };

  const handleSortChange = e => {
    const sort = e.target.value;
    onFilterChange({ cat: null, sort });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-[90px]">
      <h2 className="font-semibold text-lg text-gray-900 mb-4">Sort By</h2>
      <div className="flex flex-col gap-3 text-sm mb-6">
        {['newest', 'popular', 'trending', 'viewed'].map(sort => (
          <label key={sort} className="flex items-center gap-3 cursor-pointer hover:text-blue-800 transition-colors">
            <input
              type="radio"
              name="sort"
              value={sort}
              onChange={handleSortChange}
              className="text-blue-800 focus:ring-blue-800"
            />
            {sort[0].toUpperCase() + sort.slice(1)}
          </label>
        ))}
      </div>

      <h2 className="font-semibold text-lg text-gray-900 mb-4">Categories</h2>
      <div className="flex flex-col gap-3 text-sm">
        {[
          'all',
          'web-design',
          'development',
          'databases',
          'seo',
          'marketing',
        ].map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat === 'all' ? null : cat)}
            className="text-left hover:text-blue-800 transition-colors flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
            {cat === 'all' ? 'All' : cat.replace('-', ' ').charAt(0).toUpperCase() + cat.replace('-', ' ').slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
