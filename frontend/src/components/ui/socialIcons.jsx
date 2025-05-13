import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3">
      {[
        { icon: FaFacebookF, url: '#', label: 'Facebook' },
        { icon: FaTwitter, url: '#', label: 'Twitter' },
        { icon: FaInstagram, url: '#', label: 'Instagram' },
        { icon: FaLinkedinIn, url: '#', label: 'LinkedIn' },
        { icon: FaEnvelope, url: '#', label: 'Email' },
      ].map((social, index) => (
        <a
          key={index}
          href={social.url}
          className="group relative inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 transition-all hover:scale-105"
          aria-label={social.label}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <social.icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 text-gray-500 group-hover:text-white transition-colors duration-300" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
