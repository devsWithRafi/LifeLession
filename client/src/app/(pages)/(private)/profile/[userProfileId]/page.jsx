import Navber from '@/components/shared/navber/Navber';
import ProfileData from '../_components/ProfileData';
import Image from 'next/image';
import { getRandomCoverImage } from '@/lib/getRandomCover';
import Footer from '@/components/shared/footer/Footer';

export const metadata = {
  title: 'LifeLesson | Profile',
};

const UserProfile = () => {
  return (
    <>
      <Navber />
      <div className="min-h-screen bg-background text-foreground mt-20">
        <div className="mx-auto max-w-375 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* Cover */}
          <div className="relative h-35 w-full overflow-hidden rounded-2xl border">
            <Image
              src={getRandomCoverImage()}
              alt="Random cover image"
              fill
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
          <ProfileData />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
