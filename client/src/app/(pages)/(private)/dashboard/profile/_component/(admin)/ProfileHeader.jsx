'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Award,
  Calendar,
  Camera,
  Edit3,
  Mail,
  Shield,
  Zap,
} from 'lucide-react';
import AdminTooltip from './AdminTooltip';
import { authClient } from '@/lib/auth-client';

const formateDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const ProfileHeader = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  return (
    <Card className="overflow-hidden p-0">
      {/* Cover gradient */}
      <div className="h-32 bg-gradient-to-br from-violet-600/20 via-primary/15 to-blue-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-400/10 via-transparent to-transparent min-h-full" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar + upload */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-5">
          <div className="relative w-fit">
            <Avatar className="size-30">
              <AvatarImage src={user?.image} alt="profile" />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <AdminTooltip label="Change photo">
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors border-2 border-background">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </AdminTooltip>
            <input type="file" accept="image/*" className="hidden" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="admin">
              <Shield className="w-3 h-3" /> {user?.role}
            </Badge>
            <Badge variant="success">
              <Zap className="w-3 h-3" /> Active
            </Badge>
            <Badge variant="outline">
              <Award className="w-3 h-3" /> {user?.plan} Access
            </Badge>
          </div>
        </div>

        {/* Name + email */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">
                {user?.name}
              </h2>
              <AdminTooltip label="Edit display name">
                <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </AdminTooltip>
            </div>
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
  );
};

export default ProfileHeader;
