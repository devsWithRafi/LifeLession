import NavLogo from '@/components/NavLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaDiscord } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  explore: [
    { name: 'Home', path: '/', access: 'public' },
    { name: 'Public Lessons', path: '/public-lessons', access: 'public' },
    { name: 'Pricing', path: '/pricing', access: 'private' },
    { name: 'Favorites', path: '/favorites', access: 'private' },
  ],
  account: [
    { name: 'Dashboard', path: '/dashboard', access: 'private' },
    { name: 'Add Lesson', path: '/dashboard/add-lesson', access: 'public' },
    { name: 'My Lessons', path: '/dashboard/my-lessons', access: 'private' },
    { name: 'My Profile', path: '/dashboard/profile', access: 'private' },
  ],
};

const socialLinks = [
  { name: 'Facebook', path: 'https://www.facebook.com', icon: FaFacebook },
  { name: 'Instagram', path: 'https://www.instagram.com', icon: FaInstagram },
  { name: 'Twitter', path: 'https://x.com/', icon: FaXTwitter },
  { name: 'Linkedin', path: 'https://www.linkedin.com', icon: FaLinkedinIn },
  { name: 'Discord', path: 'https://discord.com', icon: FaDiscord },
];

const Footer = () => {
  return (
    <footer className="p-4">
      <div className="bg-black sm:p-10 p-5 relative rounded-xl overflow-hidden flex flex-col gap-10 justify-between">
        <div className="relative w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-5 gap-8 justify-between max-w-375 mx-auto">
          <div className="sm:col-span-1 col-span-2 w-full">
            <NavLogo variant="white" className="w-50" />
            <p className="text-white/60 md:text-sm text-xs mt-2 max-w-[80%]">
              Preserve the wisdom you&apos;ve gained through life&apos;s
              experiences. Digital Life Lessons helps you capture meaningful
              insights, organize personal growth journeys.
            </p>
          </div>

          {Object.entries(footerLinks).map(([key, value], index) => (
            <div key={index} className="text-white w-full">
              <h4 className="capitalize font-semibold mb-3 md:text-lg text-sm">
                {key}
              </h4>
              <ul className="flex flex-col gap-2">
                {value.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-white/60 md:text-sm text-xs hover:text-white duration-200 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 sm:col-span-3 col-span-2 text-white w-full">
            <h4 className="capitalize font-semibold mb-3 md:text-lg text-sm">
              Get Updates
            </h4>
            <div className="border-2 border-white/15 focus-within:border-white/30 duration-200 flex items-center w-full h-10 rounded-full p-0.5 text-sm font-sans font-medium">
              <input
                type="text"
                className="w-full h-full outline-none border-none px-4 text-white/80"
                placeholder="Subscribe"
              />
              <Button className="bg-white text-black rounded-full h-full px-4 hover:bg-white/80 hover:text-black">
                Subscribe
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="size-9 text-white/50 hover:bg-white/20 hover:text-white/70 aspect-square rounded-full bg-white/15 flex items-center justify-center"
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* terms and privacy */}
        <div className="flex sm:flex-row flex-col items-center justify-between max-w-375 mx-auto gap-5 w-full">
          <p className="text-white/60 sm:text-sm text-xs">
            &copy; {new Date().getFullYear()} LifeLessons. All rights reserved
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-white/60 sm:text-sm text-xs hover:text-white duration-200 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-white/60 sm:text-sm text-xs hover:text-white duration-200 hover:underline"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
