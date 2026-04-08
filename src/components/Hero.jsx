import { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  // Use a ref for GSAP to animate without causing React re-renders
  const frameData = useRef({ frame: 0 });

  const renderFrame = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const currentFrame = Math.floor(frameData.current.frame);
    const img = imagesRef.current[currentFrame];

    // Ensure image exists and is fully loaded before drawing
    if (!img || !img.complete || img.naturalHeight === 0) return;

    // alpha: false offers a massive performance boost for fully opaque canvases
    const ctx = canvas.getContext("2d", { alpha: false });
    
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const hRatio = w / img.width;
    const vRatio = h / img.height;
    const ratio = Math.max(hRatio, vRatio); 
    const centerShift_x = (w - img.width * ratio) / 2;
    const centerShift_y = (h - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    let isCancelled = false;

    // Load images outside of GSAP setup to not hold up DOM mutations
    const loadImages = async () => {
      // Pre-fill the array to avoid sparse array or strict-mode double-push issues
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        
        const img = new Image();
        img.decoding = "async"; // non-blocking decode for better performance
        const indexStr = i.toString().padStart(3, "0");
        img.src = `/ezgif-frame-${indexStr}.jpg`;

        img.onload = () => {
          if (isCancelled) return;
          loadedCount++;
          
          // Force a render immediately if the current playhead lands on this newly loaded frame
          if (i - 1 === Math.floor(frameData.current.frame)) {
            renderFrame();
          }

          if (loadedCount === TOTAL_FRAMES) {
            setImagesLoaded(true);
          }
        };
        
        imagesRef.current[i - 1] = img; // Assign statically by index
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Synchronous GSAP execution is crucial here. Wait for layout, not images.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const dpr = window.devicePixelRatio || 1;
    
    // Initial static canvas sizing
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset exactly once before scaling
    ctx.scale(dpr, dpr);

    let ctxContext = gsap.context(() => {
      // By rendering the scrollTrigger synchronously on mount, we ensure all other 
      // sections below the hero calculate their offsets taking the 400vh pin into account!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}`, // 400vh
          scrub: 0.5,
          pin: true,
          onUpdate: () => renderFrame(),
        }
      });

      // 0–20% (Hero State - Assembled phone)
      tl.to(frameData.current, {
        frame: Math.floor(TOTAL_FRAMES * 0.20),
        ease: "none",
        duration: 1
      }, 0);

      // Fade out text 1
      tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);

      // 20–60% (Explosion Phase)
      tl.to(frameData.current, {
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
      tl.to(frameData.current, {
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
      tl.to(frameData.current, {
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

    // After all synchronous DOM additions, force GSAP to sort Triggers by DOM placement
    // and recalibrate the document height perfectly.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    // Handle Window Resize 
    const handleResize = () => {
      if(!canvasRef.current) return;
      const cvs = canvasRef.current;
      const context = cvs.getContext("2d", { alpha: false });
      const currentDpr = window.devicePixelRatio || 1;
      
      cvs.width = window.innerWidth * currentDpr;
      cvs.height = window.innerHeight * currentDpr;
      
      context.setTransform(1, 0, 0, 1, 0, 0); 
      context.scale(currentDpr, currentDpr);
      renderFrame();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctxContext.revert();
      window.removeEventListener('resize', handleResize);
    };

  }, [renderFrame]);

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
        
        {/* OVERLAY TEXTS */}
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
