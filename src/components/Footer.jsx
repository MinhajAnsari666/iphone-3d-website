import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });

      tl.from(".footer-anim", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(".footer-divider", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.6");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#020202] text-neutral-400 py-16 px-6 md:px-20 text-sm relative z-10 overflow-hidden">
      
      {/* Subtle decorative background text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex justify-center translate-y-[-20%]">
        <h1 className="text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap">
          IPHONE 16 PRO
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          
          <div className="footer-anim mb-8 md:mb-0">
            <h4 className="text-white text-lg font-semibold tracking-wide mb-4">Explore</h4>
            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:text-white transition-colors duration-300 relative group w-fit">
                iPhone
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 relative group w-fit">
                Mac
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 relative group w-fit">
                Watch
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
          
          <div className="footer-anim mb-8 md:mb-0">
            <h4 className="text-white text-lg font-semibold tracking-wide mb-4">Support</h4>
            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:text-white transition-colors duration-300 relative group w-fit">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300 relative group w-fit">
                Repair Status
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          <div className="footer-anim flex flex-col items-start md:items-end">
             <div className="text-left md:text-right">
               <p className="text-white font-medium mb-1">Stay updated</p>
               <p className="font-light mb-4">Sign up for the latest news and offers.</p>
               <div className="flex border border-white/20 rounded-full overflow-hidden focus-within:border-white transition-colors">
                  <input type="email" placeholder="Email Address" className="bg-transparent px-4 py-2 outline-none text-white w-full md:w-auto" />
                  <button className="bg-white text-black px-4 font-medium hover:bg-neutral-200 transition-colors">Join</button>
               </div>
             </div>
          </div>

        </div>

        <div className="footer-divider w-full h-[1px] bg-white/10 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
           <p className="footer-anim w-full text-center md:text-left mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} Apple Inc. (Clone for demonstration). All rights reserved.
          </p>
          <div className="footer-anim flex space-x-6 overflow-x-auto whitespace-nowrap">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Sales and Refunds</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>

        {/* Designed & Developed Section */}
        <div className="footer-anim w-full mt-12 pt-6 flex flex-col items-center justify-center text-sm md:text-base mb-4 relative z-20">
           <p className="text-neutral-400 font-light flex items-center flex-wrap justify-center gap-1.5">
             <span>designed and developed by</span>
             <a 
               href="https://minhaj-potfolio.vercel.app/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="relative inline-block font-semibold group"
             >
               {/* Ambient Glow */}
               <span className="absolute inset-0 bg-white/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></span>
               
               <span className="relative z-10 text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-100 group-hover:via-neutral-400 group-hover:to-neutral-100 bg-[length:200%_auto]">
                 Ansari Md Minhaj
               </span>
               <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center"></span>
             </a>
           </p>
        </div>
      </div>
    </footer>
  );
}
