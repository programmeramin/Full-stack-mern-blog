import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';


const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  placeholder = 'blur', // 'blur' or 'empty'
  blurDataURL,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholder === 'blur' ? blurDataURL : src);
  
  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Handle image error
  const handleError = () => {
    setImgSrc('/placeholder.jpg'); // Default fallback image
  };

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority) {
      // Priority images load immediately
      setImgSrc(src);
      return;
    }

    if (!src) {
      setImgSrc('/placeholder.jpg');
      return;
    }

    // Create a safe ID from the src
    const safeId = src ? `img-${src.replace(/[^\w-]/g, '-')}` : 'img-placeholder';
    const imgElement = document.getElementById(safeId);
    
    if (!imgElement) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImgSrc(src);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // Start loading when image is 200px from viewport
      threshold: 0.01
    });
    
    observer.observe(imgElement);
    
    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  // Check if URL is from Cloudinary
  const isCloudinaryUrl = (url) => {
    return url && typeof url === 'string' && url.includes('cloudinary.com');
  };

  // Generate responsive srcSet
  const generateSrcSet = () => {
    if (!src) return '';
    
    // If it's a Cloudinary URL, use Cloudinary's transformation capabilities
    if (isCloudinaryUrl(src)) {
      // Extract the base URL and add width transformations
      const baseUrl = src.split('/upload/')[0] + '/upload/';
      const imagePath = src.split('/upload/')[1];
      
      const widths = [640, 750, 828, 1080, 1200, 1920];
      return widths.map(w => `${baseUrl}w_${w}/q_auto/${imagePath} ${w}w`).join(', ');
    }
    
    // For regular images, use the standard approach
    // Extract base path and extension
    const lastDot = src.lastIndexOf('.');
    const basePath = lastDot !== -1 ? src.substring(0, lastDot) : src;
    const ext = lastDot !== -1 ? src.substring(lastDot) : '';
    
    // Generate srcSet with different sizes
    const widths = [640, 750, 828, 1080, 1200, 1920];
    const srcSet = widths.map(w => `${basePath}-${w}${ext} ${w}w`).join(', ');
    
    return srcSet;
  };

  // Create a safe ID from the src
  const safeId = src ? `img-${src.replace(/[^\w-]/g, '-')}` : 'img-placeholder';

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        id={safeId}
        src={imgSrc || '/placeholder.jpg'}
        alt={alt || "Image"}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        srcSet={isCloudinaryUrl(src) ? generateSrcSet() : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
      
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 