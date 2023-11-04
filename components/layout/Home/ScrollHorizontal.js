'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Slider from '@/components/layout/Home/Slider';

const ScrollHorizontal = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-400vw',
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2500 top',
          scrub: 0.6,
          pin: true,
          snap: {
            snapTo: 1 / 4,
            duration: 1.5,
          },
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[500vw] flex flex-row relative"
        >
          <Slider />
        </div>
      </div>
    </section>
  );
};
export default ScrollHorizontal;
