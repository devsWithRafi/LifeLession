'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { heroSliderData } from '@/lib/dummy-data/heroSlidersData';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { IoMdArrowForward } from 'react-icons/io';

export default function HeroSection() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // simple autoplay
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative h-screen w-screen overflow-hidden p-2">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="h-full rounded-lg overflow-hidden"
      >
        <CarouselContent className="h-[calc(100vh-15px)]">
          {heroSliderData.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover w-full h-full"
              />
              {/* dark gradient so text + navbar stay legible over any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />

              <div className="absolute inset-x-0 bottom-5 flex flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-12">
                <div>
                  <div className="max-w-xl">
                    <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    <h1 className="text-3xl font-bold leading-snug text-white md:text-4xl font-boldonse">
                      {slide.title}
                    </h1>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
                      {slide.description}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <Link
                        href="/dashboard/add-lesson"
                        className={cn(
                          buttonVariants({ variant: 'secondary' }),
                          'h-auto py-2.5 px-7 rounded-full bg-white text-black hover:bg-white/80',
                        )}
                      >
                        Start Writing
                      </Link>
                      <Link
                        href="/public-lesson"
                        className={cn(
                          buttonVariants({ variant: 'outline' }),
                          'h-auto py-2.5 px-7 rounded-full bg-transparent hover:bg-transparent text-white/80 hover:text-white border-white/50',
                        )}
                      >
                        Explore Lessons
                        <IoMdArrowForward />
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                      {heroSliderData.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => api?.scrollTo(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={slide.author.avatar}
                    alt={slide.author.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-white/50 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {slide.author.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {slide.author.date} • {slide.author.readTime}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
