'use client';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  lessonCategory,
  lessonEmotionalTone,
} from '@/lib/dummy-data/lessonCategory';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyFavoriteLessonHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultQuery = { category: '', emotionalTone: '', title: '' };
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(query).map(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/dashboard/my-favorites?${params.toString()}`);
  }, [query]);

  const handleReset = () => {
    setQuery(defaultQuery);
    router.push(`/dashboard/my-favorites`);
  };

  return (
    <div className="sm:pb-3 flex flex-wrap items-center justify-between gap-5 w-full">
      <div>
        <h2 className="sm:text-lg font-medium text-sm">My Favorite Lessons</h2>
        <p className="sm:text-sm text-xs text-muted-foreground">
          Manage your favorite lessons
        </p>
      </div>

      <div className="flex items-center sm:gap-4 gap-2 md:flex-nowrap flex-wrap">
        <span className="flex items-center relative w-full lg:min-w-100 md:max-w-100 col-span-2">
          <Input
            placeholder="Search..."
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            className="rounded-md px-3 pl-7 sm:text-sm text-xs"
          />
          <Search className="absolute left-2 size-4 text-muted-foreground" />
        </span>

        <Select
          value={query.category}
          onValueChange={(e) => setQuery({ ...query, category: e })}
          className="sm:text-sm text-xs"
        >
          <SelectTrigger className="rounded-md px-3 sm:text-sm text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="sm:text-sm text-xs">
              {lessonCategory.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={query.emotionalTone}
          onValueChange={(e) => setQuery({ ...query, emotionalTone: e })}
          className="sm:text-sm text-xs"
        >
          <SelectTrigger className="rounded-md px-3 sm:text-sm text-xs">
            <SelectValue placeholder="Emotional Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lessonEmotionalTone.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleReset}
          className="rounded-md grow sm:text-sm text-xs"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MyFavoriteLessonHeader;
