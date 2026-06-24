import { fetchMostSavedLesson } from '@/actions/apis/fetchMostSavedLesson';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Bookmark, ImageOff } from 'lucide-react';

const MostSavedLesson = async () => {
  const res = await fetchMostSavedLesson();

  if (!res.success) {
    return <div>Failed to fetch most saved lesson</div>;
  }

  const data = Array.isArray(res.data) ? res.data : [];

  return (
    <>
      {data.map(
        (item) =>
          item.totalSaved > 0 && (
            <Card key={item._id}>
              <CardContent className="flex gap-5">
                <div className="bg-muted rounded aspect-square overflow-hidden md:min-w-40 min-w-20 max-w-20 md:min-h-40 min-h-20 max-h-20 md:max-h-40 md:max-w-40 relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover border-none text-[10px] text-muted-foreground"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImageOff className="text-muted-foreground sm:size-10 size-5" />
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
                  <CardTitle className="font-medium md:text-lg text-sm">{item.title}</CardTitle>
                  <CardDescription className="md:text-sm text-xs">
                    {item.description.length > 250
                      ? item.description.slice(0, 250) + '...'
                      : item.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ),
      )}
    </>
  );
};

export default MostSavedLesson;
