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

const ManageUsersHeader = ({ users }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState({ search: '', role: '' });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(query).map(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/dashboard/manage-users?${params.toString()}`);
  }, [query]);

  const handleReset = () => {
    setQuery({ search: '', role: '' });
    router.push(`/dashboard/manage-users`);
  };

  return (
    <div className="flex items-center flex-wrap justify-between gap-5">
      <div>
        <h2 className="font-medium sm:text-lg text-sm">Manage Users</h2>
        <p className="sm:text-sm text-xs text-muted-foreground">
          {users.length} registered users
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center relative">
          <Input
            value={query.search}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search by name or email..."
            className="w-full sm:min-w-100 pl-8 h-9 rounded-md grow"
          />
          <Search className="absolute left-3 size-4 text-muted-foreground" />
        </div>

        <Select
          value={query.role}
          onValueChange={(value) =>
            setQuery((prev) => ({ ...prev, role: value }))
          }
        >
          <SelectTrigger className="grow px-3 rounded-md min-h-9">
            <SelectValue placeholder="Users Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
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

export default ManageUsersHeader;
