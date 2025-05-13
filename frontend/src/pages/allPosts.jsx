import SideMenu from '@/components/sideMenu';
import PostList from '@/components/postList';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

const AllPosts = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sync with URL on first load
  useEffect(() => {
    const cat = searchParams.get('cat');
    const sort = searchParams.get('sort');
    setSelectedCategory(cat);
    setSelectedSort(sort);
  }, [searchParams]);

  const handleFilterChange = ({ cat, sort }) => {
    const params = new URLSearchParams();

    if (cat) params.set('cat', cat);
    if (sort) params.set('sort', sort);

    navigate(`/blogs?${params.toString()}`);
    setSelectedCategory(cat);
    setSelectedSort(sort);
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 capitalize">
          {selectedCategory ? `${selectedCategory.replace(/-/g, ' ')} Articles` : 'All Articles'}
        </h1>
        <p className="text-gray-600 mt-2">
          Discover our collection of insightful articles and stay updated with the latest trends
        </p>
      </div>
      
      <button
        onClick={() => setOpen(prev => !prev)}
        className="bg-blue-800 text-white text-sm px-4 py-2 rounded-full mb-6 md:hidden shadow-sm hover:bg-blue-900 transition-colors"
      >
        {open ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <PostList category={selectedCategory} sort={selectedSort} />
        </div>
        <div className={`${open ? 'block' : 'hidden'} md:block w-full md:w-1/3 lg:w-1/4`}>
          <div className="md:sticky md:top-[90px]">
            <SideMenu onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
