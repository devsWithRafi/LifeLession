'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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
import { lessonCategory } from '@/lib/dummy-data/lessonCategory';

const ReportedLessonsHeader = ({ flaggedLessons }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultQuery = {
    search: '',
    category: '',
    plan: '',
  };
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(query).map(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/dashboard/reported-lessons?${params.toString()}`);
  }, [query]);

  const handleReset = () => {
    setQuery(defaultQuery);
    router.push(`/dashboard/reported-lessons`);
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <div>
        <h2 className="sm:text-lg text-sm font-medium">Reported Lessons</h2>
        <p className="sm:text-sm text-xs text-muted-foreground">
          {flaggedLessons.length} lessons flagged for review
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center relative">
          <Input
            value={query.search}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search by title or author"
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

export default ReportedLessonsHeader;
