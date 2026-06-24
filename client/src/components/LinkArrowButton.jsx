import { cn } from '@/lib/utils';
import { MdArrowOutward } from 'react-icons/md';

const LinkArrowButton = ({ className, text, iconPosition = 'right' }) => {
  return iconPosition === 'right' ? (
    <div
      className={cn(
        'rounded-full bg-white p-0.5 flex items-center text-zinc-900 group',
        className,
      )}
    >
      <span className="text-sm px-5 pr-4 font-medium">{text}</span>
      <span className="size-10 aspect-square rounded-full bg-zinc-900 text-white flex items-center justify-center text-2xl group-hover:rotate-45 duration-300">
        <MdArrowOutward />
      </span>
    </div>
  ) : (
    <div
      className={cn(
        'rounded-full bg-white p-0.5 flex items-center text-zinc-900 group',
        className,
      )}
    >
      <span className="size-10 aspect-square rounded-full bg-zinc-900 text-white flex items-center justify-center text-2xl group-hover:rotate-45 duration-300">
        <MdArrowOutward />
      </span>
      <span className="text-sm px-5 pl-4 font-medium">{text}</span>
    </div>
  );
};

export default LinkArrowButton;
