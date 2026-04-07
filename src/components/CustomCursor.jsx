import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  useEffect(() => {
    // gsap.quickTo is optimized for values that update frequently like mouse moves
    const xMoveDot = gsap.quickTo(cursorDot.current, "x", { duration: 0.1, ease: "power3" });
    const yMoveDot = gsap.quickTo(cursorDot.current, "y", { duration: 0.1, ease: "power3" });

    const xMoveOutline = gsap.quickTo(cursorOutline.current, "x", { duration: 0.5, ease: "power3" });
    const yMoveOutline = gsap.quickTo(cursorOutline.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e) => {
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
      xMoveOutline(e.clientX);
      yMoveOutline(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursorOutline.current, { scale: 1.5, borderColor: '#00D6FF', backgroundColor: 'rgba(0, 214, 255, 0.1)', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorOutline.current, { scale: 1, borderColor: '#ff0000', backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 1, duration: 0.3 });
    };

    const handleMouseDown = () => {
      gsap.to(cursorOutline.current, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorOutline.current, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add pointer events for hover states on links and buttons
    const clickables = document.querySelectorAll('a, button, input, [class*="cursor-pointer"]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
      <div 
        ref={cursorOutline} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
