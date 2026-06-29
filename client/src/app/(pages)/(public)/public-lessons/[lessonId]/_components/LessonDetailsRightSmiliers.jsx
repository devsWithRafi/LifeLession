'use client';
import { fetchLessons } from '@/actions/apis/fetchLessons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { BookOpen, Eye, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

const LessonDetailsRightSmiliers = ({ lesson }) => {
  const [similarLessons, setSimilarLessons] = useState([]);
  const [loading, startLoading] = useTransition();

  const fetchSimilarLessons = () => {
    startLoading(async () => {
      const res = await fetchLessons({
        category: lesson.category.toLowerCase(),
        limit: 6,
      });
      if (res.success) {
        const filteredLessons = res.data.filter((l) => l._id !== lesson._id);
        setSimilarLessons(filteredLessons);
      } else {
        toast.error(res.message || 'Lessons data fetch failed');
        return;
      }
    });
  };

  useEffect(() => {
    fetchSimilarLessons();
  }, [lesson]);

  return (
    <Card className="">
      <CardHeader className="text-base font-medium">Related Lessons</CardHeader>

      {loading ? (
        <span className="w-full h-50 -mt-5 flex items-center gap-1 justify-center text-muted-foreground">
          <Spinner /> Loading...
        </span>
      ) : similarLessons.length > 0 ? (
        <CardContent className="flex flex-col py-0">
          {similarLessons.map((l, index) => (
            <div
              key={l._id}
              className={cn(
                'border-b py-3 flex items-start gap-3',
                index === similarLessons.length - 1 && 'border-none',
              )}
            >
              <div className="aspect-square rounded w-15 overflow-hidden text-xs text-muted-foreground bg-muted relative flex items-center justify-center">
                {l.image ? (
                  <Image
                    src={l.image}
                    alt={l.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="text-muted-foreground" />
                )}
              </div>
              <Link
                href={`/public-lessons/${l._id}`}
                className="flex flex-col justify-between items-start gap-0.5 group"
              >
                <h5 className="text-sm font-semibold whitespace-nowrap w-[90%] overflow-hidden text-ellipsis group-hover:underline">
                  {l.title}
                </h5>
                <p className="text-xs text-muted-foreground">{l.category}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Eye size={12} /> {l.views}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Heart size={12} /> {l.likeCount}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <MessageCircle size={12} /> {l.commentCount}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </CardContent>
      ) : (
        <span className="w-full h-50 -mt-5 flex items-center gap-1 justify-center text-muted-foreground">
          No lessons found
        </span>
      )}
    </Card>
  );
};

export default LessonDetailsRightSmiliers;
