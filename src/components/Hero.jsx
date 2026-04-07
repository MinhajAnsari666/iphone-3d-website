import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 240;

export default function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]);

  // Texts for overlays
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

  useEffect(() => {
    // Preload images into an array strictly for the canvas drawing
    let loadedCount = 0;
    const loadImages = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const indexStr = i.toString().padStart(3, "0");
        img.src = `/ezgif-frame-${indexStr}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImagesLoaded(true);
          }
        };
        imagesRef.current.push(img);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setting high resolution for Retina displays
    const dpr = window.devicePixelRatio || 1;
    // Base size for 16:9
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // The state we're animating
    const frameData = {
      frame: 0
    };

    const render = () => {
      const currentFrame = Math.floor(frameData.frame);
      if (!imagesRef.current[currentFrame]) return;
      const img = imagesRef.current[currentFrame];
      
      // Calculate responsive dimensions to simulate 'object-fit: cover' or 'contain'
      // We want the phone to occupy appropriate space
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fill black background just in case
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hRatio = (window.innerWidth) / img.width;
      const vRatio = (window.innerHeight) / img.height;
      const ratio = Math.max(hRatio, vRatio); 
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    render();

    let ctxContext = gsap.context(() => {
      // ScrollTrigger timeline that scrubs through frames
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}`, // 400vh
          scrub: 0.5,
          pin: true,
          onUpdate: () => render(),
        }
      });

      // 0–20% (Hero State - Assembled phone)
      tl.to(frameData, {
        frame: Math.floor(TOTAL_FRAMES * 0.20),
        ease: "none",
        duration: 1
      }, 0);

      // Fade out text 1
      tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);

      // 20–60% (Explosion Phase)
      tl.to(frameData, {
        frame: Math.floor(TOTAL_FRAMES * 0.60),
        ease: "none",
        duration: 2
      }, 1);

      // Fade in text 2
      tl.fromTo(text2Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        1.5
      );
      // Fade out text 2
      tl.to(text2Ref.current, { opacity: 0, y: -50, duration: 0.5 }, 2.5);

      // 60–85% (Full Exploded View / Hovering in exploded state)
      tl.to(frameData, {
        frame: Math.floor(TOTAL_FRAMES * 0.85),
        ease: "power1.inOut",
        duration: 1.5
      }, 3);

      // Fade in text 3
      tl.fromTo(text3Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        3.2
      );
      tl.to(text3Ref.current, { opacity: 0, y: -50, duration: 0.5 }, 4.0);

      // 85–100% (Reassembly)
      tl.to(frameData, {
        frame: TOTAL_FRAMES - 1, // Last frame
        ease: "power3.inOut",
        duration: 1.5
      }, 4.5);

      // Fade in text 4
      tl.fromTo(text4Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        5.2
      );
      
      // Cinematic fade-out of the canvas precisely at the end 
      // so it visually transitions smoothly into the next dark section
      tl.to(canvasRef.current, 
        { opacity: 0, duration: 0.5 }, 
        5.5
      );
      tl.to(text4Ref.current, 
        { opacity: 0, y: -20, duration: 0.5 }, 
        5.5
      );

    }, sectionRef);

    // Handle Window Resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctxContext.revert();
      window.removeEventListener('resize', handleResize);
    };

  }, [imagesLoaded]);

  return (
    <section ref={sectionRef} className="relative w-full h-[100dvh] bg-background text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        
        {/* Loader if needed */}
        {!imagesLoaded && (
          <div className="absolute z-50 text-neutral-500 font-mono text-sm tracking-widest animate-pulse uppercase">
            Loading Cinematic Engine...
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="w-full h-full block absolute inset-0 z-0 opacity-80"
          style={{ width: '100%', height: '100%', WebkitFilter: 'brightness(1.1) contrast(1.1)' }}
        />
        
        {/* OVELAY TEXTS */}
        {/* TEXT 1 */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 mix-blend-difference pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-center">
            iPhone <span className="text-accent italic font-light pr-2">16 Pro</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-300 tracking-wider">Power. Precision. Perfection.</p>
        </div>

        {/* TEXT 2 */}
        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-start justify-center z-10 p-6 md:p-12 md:pl-32 opacity-0 pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 max-w-2xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Engineered from the inside out.
          </h2>
          <div className="h-[1px] w-24 bg-accent shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
        </div>

        {/* TEXT 3 */}
        <div ref={text3Ref} className="absolute inset-0 flex flex-col items-end justify-center z-10 p-6 md:p-12 md:pr-32 opacity-0 text-right pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 max-w-xl text-white">
            Every component,<br/> perfected.
          </h2>
          <p className="text-neutral-400 max-w-md text-lg">A16 Bionic chip, pro camera system, and all-day battery life, perfectly orchestrated.</p>
        </div>

        {/* TEXT 4 */}
        <div ref={text4Ref} className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-32 opacity-0 pointer-events-none">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Experience the future.
          </h2>
        </div>

      </div>
    </section>
  );
}

