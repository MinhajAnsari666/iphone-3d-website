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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative bg-background min-h-screen text-white font-sans selection:bg-accent/30 selection:text-white cursor-none md:cursor-none">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <BentoGallery />
        <Features />
        <MarqueeText />
        <Performance />
        <Gallery />
        <Specs />
        <TextHighlight />
        <BuyForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
