import { fetchTopContributors } from '@/actions/apis/fetchTopContributors';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';

const TopContributors = async () => {
  const res = await fetchTopContributors();

  if (!res.success) {
    return <div>Failed to fetch top contributors</div>;
  }

  const data = Array.isArray(res.data) ? res.data : [];

  return (
    <>
      {data.map((item, index) => (
        <div
          key={item._id}
          className="flex w-full items-center gap-2 border-b py-3"
        >
          <span className="rounded-full bg-muted flex items-center justify-center aspect-square w-7 h-7">
            {index + 1}
          </span>
          <Avatar className="size-10">
            <AvatarImage src={item.author.image} alt={item.author.name} />
            <AvatarFallback>
              {fallBackNameFormat(item.author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full">
            <h3 className="font-semibold">{item.author.name}</h3>
            <p className="text-muted-foreground text-xs">{item.author.email}</p>
          </div>
          <p className="text-muted-foreground text-sm whitespace-nowrap font-medium">
            {item.totalLessons} Lessons
          </p>
        </div>
      ))}
    </>
  );
};

export default TopContributors;
