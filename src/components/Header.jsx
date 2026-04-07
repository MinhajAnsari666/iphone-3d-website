import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Scroll state listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial cinematic drop-down animation
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: '-100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo('.nav-item',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.6 }
      );
    }, headerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        scrolled
          ? 'bg-secondary/70 backdrop-blur-md border-white/5'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-sm font-medium tracking-wide">
        <div className="nav-item flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-white text-lg font-semibold tracking-tighter">
            iPhone <span className="text-accent ml-1 uppercase text-xs">16 Pro</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-neutral-400">
          {['Overview', 'Technology', 'Performance', 'Specs', 'Buy'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-item hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-item">
          <button className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-black hover:text-white hover:ring-2 hover:ring-white transition-all duration-300 transform active:scale-95 text-xs font-semibold uppercase tracking-wider">
            Buy Now
          </button>
        </div>
      </div>
    </header>
  );
}
