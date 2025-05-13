import Container from '@/components/Container';
import { Link } from 'react-router';
import SocialIcons from './ui/socialIcons';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 sm:py-8 w-full">
      <Container className="px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 sm:gap-6 w-full">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center mx-auto md:mx-0 gap-3 sm:gap-4 md:gap-6">
            {['Home', 'Blogs', 'Contact', 'About', 'Help'].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 py-1"
              >
                {item}
              </Link>
            ))}
          </nav>
          {/* Social Icons */}
          <div className="flex justify-center mx-auto md:mx-0 mt-4 md:mt-0">
            <SocialIcons />
          </div>
        </div>

        {/* Copyright and Tagline */}
        <div className="mt-6 sm:mt-8 text-center w-full">
          <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Indulge in Every Word, Crafted with Joy
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Typeflow © {new Date().getFullYear()}. Nourishing Minds, Safeguarded
            by Design
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
