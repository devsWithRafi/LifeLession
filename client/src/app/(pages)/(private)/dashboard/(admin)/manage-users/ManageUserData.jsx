'use client';

import {
  Globe,
  Crown,
  BookOpen,
  UserRound,
  ShieldCheck,
  Check,
  X,
  Trash,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import { useAllUsers } from '@/context/all-user-context/AllUsersContextProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import ManageUsersHeader from './ManageUsersHeader';
import { useState } from 'react';
import ManageUsersDeleteModal from './ManageUsersDeleteModal';
import { PromoteUserAction } from '@/actions/PromoteUserAction';
import { getToken } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const ManageUserData = () => {
  const searchParams = useSearchParams();
  const { users: allUsers, fetchUsers, loading } = useAllUsers();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [promote, setPromote] = useState({ loading: false, userId: null });

  const filteredUsers = allUsers.filter((user) => {
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    return (
      (!role || user.role === role) &&
      (!search ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleDelete = (user) => {
    setDeleteModalOpen(true);
    setUserToDelete(user);
  };

  const promoteUserRole = async (user) => {
    setPromote({ loading: true, userId: user._id });
    try {
      const token = await getToken();
      const res = await PromoteUserAction(user._id, token);
      if (res.success) {
        fetchUsers();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPromote({ loading: false, userId: null });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full mx-auto sm:px-6 space-y-8">
          {/* ── Table ── */}
          <ManageUsersHeader users={allUsers} />
          <Card className={cn('relative p-0')}>
            {/* content */}
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent uppercase">
                      <TableHead className="sm:pl-6 pl-4 w-[250px]">
                        User
                      </TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Lessons</TableHead>
                      <TableHead>Email Verified</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        {loading ? (
                          <TableCell colSpan={10} className="h-32 text-center">
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                              <Spinner /> Loading...
                            </div>
                          </TableCell>
                        ) : (
                          <TableCell colSpan={7} className="h-32 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <BookOpen className="h-8 w-8 opacity-30" />
                              <p className="text-sm">No users yet.</p>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    )}

                    {filteredUsers.length > 0 &&
                      filteredUsers.map((user) => (
                        <TableRow key={user._id} className="group">
                          {/* User */}
                          <TableCell className="sm:pl-6 pl-4 py-4">
                            <div className="flex items-center gap-3 relative">
                              <Avatar className="size-9">
                                <AvatarImage src={user.image} alt="profile" />
                                <AvatarFallback>
                                  {fallBackNameFormat(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <p className="text-sm font-medium">
                                  {user.name.length > 15
                                    ? user.name.slice(0, 25) + '...'
                                    : user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {user.email.length > 25
                                    ? user.email.slice(0, 25) + '...'
                                    : user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Joined at */}
                          <TableCell>
                            <div className="flex flex-col gap-1.5 text-muted-foreground text-sm">
                              <span>
                                {user.createdAt
                                  ? formatDate(user.createdAt)
                                  : 'No date'}
                              </span>
                            </div>
                          </TableCell>

                          {/* Users Role */}
                          <TableCell>
                            <span
                              className={cn(
                                'capitalize inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium font-sans',
                                user.role === 'user'
                                  ? 'bg-muted text-muted-foreground'
                                  : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
                              )}
                            >
                              {user.role === 'user' ? (
                                <UserRound className="h-3 w-3" />
                              ) : (
                                <ShieldCheck className="h-3 w-3" />
                              )}
                              {user.role}
                            </span>
                          </TableCell>

                          {/* Users Plan */}
                          <TableCell>
                            <div
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium font-sans
                                ${
                                  user.plan === 'premium'
                                    ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-muted text-muted-foreground'
                                }
                                disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {user.plan === 'premium' ? (
                                <>
                                  <Crown className="h-3 w-3" /> Premium
                                </>
                              ) : (
                                <>
                                  <Globe className="h-3 w-3" /> Free
                                </>
                              )}
                            </div>
                          </TableCell>

                          {/* Lessons */}
                          <TableCell>
                            <span className="text-muted-foreground text-sm font-medium">
                              {user.lesson.length || 0}
                            </span>
                          </TableCell>

                          {/* Lessons */}
                          <TableCell>
                            {user.emailVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-green-500/20 text-green-500 font-sans">
                                <Check className="h-3.5 w-3.5" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground font-sans">
                                <X className="h-3.5 w-3.5" />
                                Not Verified
                              </span>
                            )}
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="pr-6 text-right">
                            <div>
                              <Button
                                onClick={() => promoteUserRole(user)}
                                variant="outline"
                                className="rounded-md h-8"
                              >
                                {promote.loading &&
                                promote.userId === user._id ? (
                                  <Spinner />
                                ) : user.role === 'user' ? (
                                  'Promote'
                                ) : (
                                  'Demote'
                                )}
                              </Button>
                              <Button
                                onClick={() => handleDelete(user)}
                                variant="destructive"
                                className="ml-2 sm:w-auto w-8 h-8 sm:rounded-md rounded-full"
                              >
                                <Trash className="sm:hidden flex size-3.5" />
                                <span className="sm:flex hidden">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/*  */}
      <ManageUsersDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        user={userToDelete}
      />
    </>
  );
};

export default ManageUserData;
