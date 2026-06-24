import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import LinkArrowButton from '../LinkArrowButton';
import { assets } from '@/assets/assets';

const ExploreSection = () => {
  return (
    <section className="w-full max-w-375 mx-auto p-5 flex flex-col gap-5">
      <h3 className="text-3xl font-boldonse text-center mx-auto">
        Discover Lessons. Inspire Growth.
      </h3>
      <p className="text-muted-foreground max-w-[80%] text-sm text-center mx-auto">
        Explore a world of real-life lessons shared by thoughtful minds. Find
        inspiration, gain new perspectives, and grow every day.
      </p>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 h-auto md:h-180 gap-3 mt-15">
        <div className="w-full col-span-1 h-full flex flex-col gap-3">
          <div className="w-full md:h-full relative overflow-hidden border rounded-xl h-100">
            <div className="w-full h-full relative">
              <Image
                src={assets.exploreImage.image1}
                alt=""
                fill
                className="w-full h-full object-cover "
              />
            </div>
            <div className="w-full h-full bg-black/30 p-5 flex flex-col items-start gap-4 absolute left-0 right-0 top-0 bottom-0">
              <span className="bg-white/40 backdrop-blur-[1px] rounded-2xl p-5">
                <BookOpen className="text-white/80" />
              </span>
              <span className="flex flex-col items-start justify-end gap-4 h-full">
                <h3 className="font-medium text-md max-w-[80%] font-boldonse text-white">
                  Explore more to get your comfort zone
                </h3>
                <p className="text-white/70 drop-shadow-sm text-sm">
                  Learn more and stay with us.
                </p>
                <Link href="/public-lessons">
                  <LinkArrowButton text="Explore Now" />
                </Link>
              </span>
            </div>
          </div>
          <div className="w-full md:h-full relative overflow-hidden border rounded-xl h-100">
            <div className="w-full h-full relative">
              <Image
                src={assets.exploreImage.image2}
                alt=""
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full bg-black/30 p-5 flex flex-col items-start gap-4 absolute left-0 right-0 top-0 bottom-0">
              <span className="bg-white/40 backdrop-blur-[1px] rounded-2xl p-5">
                <BookOpen className="text-white/80" />
              </span>
              <span className="flex flex-col items-start justify-end gap-4 h-full">
                <h3 className="font-medium text-md max-w-[80%] font-boldonse text-white">
                  Share your wisdom, help others grow
                </h3>
                <p className="text-white/70 drop-shadow-sm text-sm">
                  Contribute your life lessons and make positive impact on
                  someone's journey.
                </p>
                <Link href="/dashboard/add-lesson">
                  <LinkArrowButton text="Share Now" />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 relative overflow-hidden md:h-full rounded-xl border h-170">
          <div className="w-full h-full relative">
            <Image
              src={assets.exploreImage.image3}
              alt=""
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full bg-black/30 p-5 flex flex-col items-start gap-4 absolute left-0 right-0 top-0 bottom-0">
            <span className="flex flex-col items-start justify-end gap-4 h-full">
              <h3 className="font-medium md:text-3xl text-xl max-w-[80%] font-boldonse text-white">
                A library of real life experiences
              </h3>
              <p className="text-white/70 drop-shadow-sm md:text-lg text-sm max-w-[80%]">
                Browse lessons on relationships, mindset, success, self-growth
                and more.
              </p>
              <Link href="/public-lessons">
                <LinkArrowButton text="Browse Now" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
