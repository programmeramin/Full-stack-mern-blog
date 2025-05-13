import { Sparkles, PenTool, Users, BookOpen } from 'lucide-react';
import heroImage from '../assets/images/hero.png';

const About = () => {
    const handleClick = () => {
        window.location.href = '/contact';
    };
  return (
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-gray-50 rounded-3xl p-10 shadow-md">
        
        {/* Left Side - Image */}
        <img
          src={heroImage} 
          className="w-full h-auto rounded-xl object-cover shadow"
        />

        {/* Right Side - Text */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Discover Our Story
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-600">Typeflow</span> — your gateway to a world where stories breathe, creativity flows, and voices are heard. 
            We’re building a community where writers and readers alike can connect, create, and inspire one another.
            Dive into rich narratives, craft your own adventures, and share your perspective with the world.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span>Ignite Creativity</span>
      </div>
            <div className="flex items-center gap-2 text-gray-700">
              <PenTool className="h-5 w-5 text-indigo-600" />
              <span>Write Freely</span>
      </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-5 w-5 text-indigo-600" />
              <span>Build Community</span>
      </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span>Read & Explore</span>
    </div>
  </div>

          <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-sm font-medium transition">
            Learn More
          </button>
        </div>
  </div> 
    </section>
  );
};

export default About;
 