import { fetchTopContributors } from '@/actions/apis/fetchTopContributors';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import { Medal } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

const TopContributors = async () => {
  const res = await fetchTopContributors();

  if (!res.success) {
    return (
      <Card className="rounded-md h-100 bg-red-500/5 border border-red-500/10 text-red-400 w-1/2">
        <CardContent className="flex items-center justify-center w-full h-full">
          Failed to fetch top contributors
        </CardContent>
      </Card>
    );
  }

  const data = Array.isArray(res.data) ? res.data : [];

  return (
    <div className="max-h-full flex flex-col gap-5 md:min-w-100 md:max-w-100 bg-card p-5 rounded-xl relative overflow-hidden">
      <h4 className="flex items-center gap-1 font-boldonse text-sm">
        <Medal className="size-6" /> Top Contributors
      </h4>

      <div className="flex flex-col md:h-full md:max-h-max max-h-100 flex-1 overflow-y-auto min-h-0 pb-10">
        {data.map((item, index) => (
          <div
            key={item._id}
            className={cn(
              'flex w-full items-center gap-2 py-3',
              data.length - 1 !== index ? 'border-b' : 'border-none',
            )}
          >
            <span className="rounded-full bg-muted flex items-center justify-center aspect-square w-5.5 h-5.5 text-xs">
              {index + 1}
            </span>
            <Avatar className="size-8">
              <AvatarImage src={item.author.image} alt={item.author.name} />
              <AvatarFallback>
                {fallBackNameFormat(item.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
              <h3 className="font-semibold text-sm">{item.author.name}</h3>
              <p className="text-muted-foreground text-xs max-w-[70%] whitespace-nowrap text-ellipsis overflow-hidden">
                {item.author.email}
              </p>
            </div>
            <p className="text-muted-foreground text-xs whitespace-nowrap font-medium">
              {item.totalLessons} Lessons
            </p>
          </div>
        ))}
      </div>

      <div className="w-full absolute bottom-0 left-0 right-0 p-5 pt-1 bg-card">
        <Link
          href={'/dashboard/add-lesson'}
          className={cn(buttonVariants(), 'rounded-full h-auto py-2 w-full')}
        >
          Become a Contributor
        </Link>
      </div>
    </div>
  );
};

export default TopContributors;
