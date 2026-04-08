import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import TextHighlight from './components/TextHighlight';
import Performance from './components/Performance';
import Features from './components/Features';
import MarqueeText from './components/MarqueeText';
import BentoGallery from './components/BentoGallery';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import BuyForm from './components/BuyForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, 
      wheelMultiplier: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Extremely important: Watch for dynamically loading images displacing layout
    // This prevents all ScrollTriggers from breaking/triggering early
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    // Also force a refresh after standard load times
    const timeout1 = setTimeout(() => ScrollTrigger.refresh(), 1000);
    const timeout2 = setTimeout(() => ScrollTrigger.refresh(), 3000);

    return () => {
      lenis.destroy();
      ro.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="relative bg-background min-h-screen text-white font-sans selection:bg-accent/30 selection:text-white cursor-none md:cursor-none">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Performance />
        <BentoGallery />
        <Features />
        <MarqueeText />
        <Gallery />
        <TextHighlight />
        <Specs />
        <BuyForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
