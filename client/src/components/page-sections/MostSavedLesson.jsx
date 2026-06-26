import { fetchMostSavedLesson } from '@/actions/apis/fetchMostSavedLesson';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Bookmark, BookOpen, ImageOff } from 'lucide-react';

const MostSavedLesson = async () => {
  const res = await fetchMostSavedLesson();

  if (!res.success) {
    return (
      <Card className="rounded-md h-100 bg-red-500/5 border border-red-500/10 text-red-400 w-1/2">
        <CardContent className="flex items-center justify-center w-full h-full">
          Failed to fetch most saved lesson
        </CardContent>
      </Card>
    );
  }

  const data = Array.isArray(res.data) ? res.data : [];

  return (
    <div className="max-h-full flex flex-col gap-5">
      <h4 className="flex items-center gap-1 font-boldonse text-xl">
        <Bookmark className="size-8" /> Most Saved Lessons
      </h4>
      <div className="h-full p-0.5 overflow-y-auto">
        <div className="flex flex-col gap-2 justify-between h-full">
          {data.slice(0, 4).map(
            (item) =>
              item.totalSaved > 0 && (
                <Card key={item._id} className="bg-transparent">
                  <CardContent className="flex gap-5">
                    <div className="bg-muted rounded aspect-square overflow-hidden md:min-w-30 min-w-20 max-w-20 md:min-h-30 min-h-20 max-h-20 md:max-h-30 md:max-w-30 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="w-full h-full object-cover border-none text-[10px] text-muted-foreground"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <BookOpen className="text-muted-foreground sm:size-10 size-5" />
                        </div>
                      )}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-5 w-full text-xs">
                        <span className="uppercase text-muted-foreground font-medium">
                          {item.category}
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground font-medium">
                          {item.totalSaved} Saves
                        </span>
                      </div>
                      <CardTitle className="font-medium md:text-lg text-sm">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="md:text-sm text-xs">
                        {item.description.length > 180
                          ? item.description.slice(0, 180) + '...'
                          : item.description}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MostSavedLesson;
