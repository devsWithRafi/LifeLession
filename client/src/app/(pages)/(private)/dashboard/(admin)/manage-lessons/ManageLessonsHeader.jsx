import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formateNumber } from '@/lib/formateNumber';
import { BookOpen, Flag, GlobeCheck, Lock, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  lessonCategory,
  lessonEmotionalTone,
} from '@/lib/dummy-data/lessonCategory';

const ManageLessonsHeader = ({ lessons }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPublic = lessons.filter((l) => l.isPublic).length;
  const totalPrivate = lessons.filter((l) => !l.isPublic).length;
  const totalFeatured = lessons.filter((l) => l.isFeatured).length;
  const totalFlagged = lessons.reduce((s, l) => s + l.reports.length, 0);
  const summary = [
    { label: 'Public', value: formateNumber(totalPublic), icon: GlobeCheck },
    { label: 'Private', value: formateNumber(totalPrivate), icon: Lock },
    { label: 'Featured', value: formateNumber(totalFeatured), icon: BookOpen },
    {
      label: 'Flagged',
      value: formateNumber(totalFlagged),
      icon: Flag,
    },
  ];

  const defaultQuery = {
    search: '',
    category: '',
    emotionalTone: '',
    plan: '',
  };
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(query).map(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/dashboard/manage-lessons?${params.toString()}`);
  }, [query]);

  const handleReset = () => {
    setQuery(defaultQuery);
    router.push(`/dashboard/manage-lessons`);
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <div>
        <h2 className="sm:text-lg text-sm font-medium">Manage Lessons</h2>
        <p className="sm:text-sm text-xs text-muted-foreground">
          {lessons.length} total lessons on the platform
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {summary.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="py-0">
            <CardContent className="sm:p-5 p-3 flex items-center gap-3">
              <div className="flex sm:p-4 p-3 aspect-square shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="sm:text-xl text-sm font-bold tabular-nums leading-none">
                  {value}
                </p>
                <p className="sm:text-sm text-xs text-muted-foreground mt-0.5">
                  {label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center relative">
          <Input
            value={query.search}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search by title"
            className="w-full sm:grow-0 sm:min-w-100 pl-8 h-9 rounded-md grow"
          />
          <Search className="absolute left-3 size-4 text-muted-foreground" />
        </div>

        <Select
          value={query.category}
          onValueChange={(value) =>
            setQuery((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="grow px-3 rounded-md min-h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lessonCategory.map((cat, index) => (
                <SelectItem key={index} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={query.emotionalTone}
          onValueChange={(value) =>
            setQuery((prev) => ({ ...prev, emotionalTone: value }))
          }
        >
          <SelectTrigger className="grow px-3 rounded-md min-h-9">
            <SelectValue placeholder="Emotional Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lessonEmotionalTone.map((tone, index) => (
                <SelectItem key={index} value={tone}>
                  {tone}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={query.plan}
          onValueChange={(value) =>
            setQuery((prev) => ({ ...prev, plan: value }))
          }
        >
          <SelectTrigger className="grow px-3 rounded-md min-h-9">
            <SelectValue placeholder="Access Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={handleReset} className="h-9 px-3">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ManageLessonsHeader;
