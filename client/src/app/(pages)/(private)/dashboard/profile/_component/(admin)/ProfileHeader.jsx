'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Award, Calendar, Edit3, Mail, Shield, Zap } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import UserProfileUpdateModal from '../UserProfileUpdateModal';
import { useState } from 'react';
import { fallBackNameFormat } from '@/lib/falbackNameFormat';
import Image from 'next/image';
import { getRandomCoverImage } from '@/lib/getRandomCover';

const formateDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const ProfileHeader = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden p-0">
        {/* Cover gradient */}
        <div className="h-32 w-full relative overflow-hidden">
          <Image
            src={getRandomCoverImage()}
            alt=""
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + upload */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-5">
            <div className="relative w-fit">
              <Avatar className="size-30">
                <AvatarImage src={user?.image} alt="profile" />
                <AvatarFallback>
                  {fallBackNameFormat(user?.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="bg-orange-300/10 dark:border-orange-200/30 border-orange-300 dark:text-orange-200 text-orange-400 capitalize"
              >
                <Shield className="w-3 h-3" /> {user?.role}
              </Badge>
              <Badge
                variant="outline"
                className="bg-green-300/10 dark:border-green-200/30 border-green-300 dark:text-green-200 text-green-500 capitalize"
              >
                <Zap className="w-3 h-3" /> Active
              </Badge>
              <Badge variant="outline" className="capitalize">
                <Award className="w-3 h-3" /> {user?.plan} Access
              </Badge>
            </div>
          </div>

          {/* Name + email */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {user?.name}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2"
                    onClick={() => setModalOpen((prev) => !prev)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit profile
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{user?.bio}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Joined {formateDate(user?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* profile settings modal */}
      <UserProfileUpdateModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
};

export default ProfileHeader;
