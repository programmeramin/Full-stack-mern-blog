import FeaturePosts from '@/components/featurePosts';
import MainCategories from '@/components/mainCatagories';
import PostList from '@/components/postList';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router';
import OptimizedImage from '@/components/OptimizedImage';

const Home = () => {
  const location = useLocation();

  const selectedCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('cat');
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl md:rounded-3xl mt-2 mb-6 sm:mb-8 p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
          <div className="w-64 h-64 rounded-full bg-blue-200 opacity-20"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 hidden lg:block">
          <div className="w-40 h-40 rounded-full bg-indigo-200 opacity-20"></div>
        </div>
        
        {/* BREADCRUMB */}
        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-blue-800 transition-colors">Home</Link>
          <span>•</span>
          <span className="text-blue-800 font-medium">Blogs and Articles</span>
        </div>
        
        {/*INTRODUCTION */}
        <div className="relative z-10">
          {/* titles */}
          <div className="max-w-3xl">
            <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Unveiling Creative Realms, Ideas, and Tech Discoveries
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-700">
              Indulge in Every Word, Crafted with Joy
            </p>
            <div className="mt-4 sm:mt-6 md:mt-8">
              <Link 
                to="/blogs" 
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full shadow-sm text-white bg-blue-800 hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Explore All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* FEATURED POSTS with section title */}
      <div className="my-8 sm:my-10 md:my-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Featured Articles</h2>
        <FeaturePosts />
      </div>

      {/* Categories Section with improved styling */}
      <div className="my-8 sm:my-10 md:my-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Browse by Category</h2>
        <MainCategories />
      </div>
      
      {/* POST LIST with enhanced section styling */}
      <div className="my-8 sm:my-10 md:my-12 pb-12 sm:pb-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
          {selectedCategory ? `${selectedCategory.replace(/-/g, ' ')} Articles` : 'Latest Articles'}
        </h2>
        <PostList category={selectedCategory} />
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 my-8 sm:my-10 md:my-12 shadow-sm">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Get the latest articles and insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-md text-sm sm:text-base"
            />
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
