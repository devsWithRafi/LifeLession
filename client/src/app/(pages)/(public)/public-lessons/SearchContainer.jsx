'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const SearchContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const defaultQuery = {
    title: ''.toLowerCase(),
    category: ''.toLowerCase(),
    emotionalTone: ''.toLowerCase(),
    accessLevel: ''.toLowerCase(),
  };

  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value.toLowerCase());
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [query]);

  const handleReset = () => {
    setQuery(defaultQuery);
    router.push(pathname);
  };

  return (
    <div className="mt-10 w-full grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 items-end gap-2">
      <div className="flex flex-col gap-3 col-span-2">
        <Label>Search Lessons</Label>
        <div className="flex items-center gap-2 w-full relative">
          <Search className="text-muted-foreground absolute left-3 size-5" />
          <Input
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            placeholder="Search by title"
            className={'min-w-full rounded-md px-4 h-11 pl-9'}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Category</Label>
        <Select
          value={query.category}
          onValueChange={(value) => setQuery({ ...query, category: value })}
        >
          <SelectTrigger className="w-full min-h-11 px-4 capitalize rounded-md">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lessonCategory.map((cat, index) => (
                <SelectItem key={index} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Emotional Tone</Label>
        <Select
          value={query.emotionalTone}
          onValueChange={(value) =>
            setQuery({ ...query, emotionalTone: value })
          }
        >
          <SelectTrigger className="w-full min-h-11 px-4 capitalize rounded-md">
            <SelectValue placeholder="Select Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lessonEmotionalTone.map((tone, index) => (
                <SelectItem key={index} value={tone} className="capitalize">
                  {tone}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Access Level</Label>
        <Select
          value={query.accessLevel}
          onValueChange={(value) => setQuery({ ...query, accessLevel: value })}
        >
          <SelectTrigger className="w-full min-h-11 px-4 capitalize rounded-md">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {['premium', 'free'].map((acc, index) => (
                <SelectItem key={index} value={acc} className="capitalize">
                  {acc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleReset} className="w-full h-11 rounded-md">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SearchContainer;
