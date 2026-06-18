import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { RiShareBoxFill } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { LiquidMetalButton } from '../ui/liquid-metal-button';
import { Crown, Zap } from 'lucide-react';
import { RiLock2Line } from 'react-icons/ri';
import { formatDate } from '@/lib/formatDate';
import { IoMdTime } from 'react-icons/io';

const LessonCard = ({ lesson: l }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <LiquidMetalButton
          theme={l.accessType === 'premium' ? 'gold' : 'silver'}
          variant="default"
          size="sm"
          className={'pointer-events-none select-none rounded-full'}
        >
          <div className="flex items-center">
            {l.accessType === 'premium' ? (
              <Crown className="mr-2 h-4 w-4" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            <span>{l.accessType.toUpperCase()}</span>
          </div>
        </LiquidMetalButton>
      </CardHeader>
      <CardContent className="flex-col flex h-full gap-6">
        <div className="h-full relative">
          <div
            className={cn(
              'justify-between flex-col flex h-full',
              l.accessType === 'premium' && 'blur-md select-none',
            )}
          >
            <span>
              <CardTitle className="text-4xl font-bold font-playfair italic w-full">
                {`"${l.title}"`}
              </CardTitle>
              <CardDescription className="font-roboto mt-2">
                {l.description}
              </CardDescription>
            </span>

            <div className="flex gap-5 justify-between bg-muted py-4 rounded mt-5 text-muted-foreground">
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <AiOutlineLike className="size-4.5" />
                {l.likes.length}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <BiComment className="size-4" />
                {l.comments.length}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <MdOutlineRemoveRedEye className="size-4.5" />
                {l.views}
              </span>
              <Separator orientation="vertical" />
              <span className="flex gap-2 items-center text-sm justify-center w-full">
                <RiShareBoxFill className="size-4" />
              </span>
            </div>
          </div>

          {l.accessType === 'premium' && (
            <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center cursor-not-allowed">
              <span className="p-5 rounded-full bg-muted">
                <RiLock2Line className="size-10 text-muted-foreground" />
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Avatar className={'size-10'}>
              <AvatarImage src={l.author.image} />
              <AvatarFallback>{l.author.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold leading-none">
                {l.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{l.author.bio}</p>
            </div>
          </div>

          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <IoMdTime />
            {formatDate(l.createdAt)}
          </span>
        </div>

        <Link
          href={`public-lessons/${l._id}`}
          className={cn(buttonVariants(), 'h-auto py-2 rounded',
           l.accessType === 'premium' && 'pointer-events-none select-none opacity-20'
          )}
        >
          {l.accessType === 'free' ? 'See Details' : 'Upgrade to Unlock'}
        </Link>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
