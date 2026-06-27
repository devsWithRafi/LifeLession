'use client';
import { fetchUserProfile } from '@/actions/apis/fetchUserProfile';
import { Separator } from '@/components/ui/separator';
import { authClient, getToken } from '@/lib/auth-client';
import { formateNumber } from '@/lib/formateNumber';
import { Bookmark, BookOpen, Eye, Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

const UsersStates = () => {
  const [userData, setUserData] = useState({});
  const [loading, startLoading] = useTransition();
  const { data } = authClient.useSession();
  const user = data?.user;

  const userId = user?.id || null;

  const fetchUserProfileData = () => {
    if (!userId) return;
    startLoading(async () => {
      const token = await getToken();
      const res = await fetchUserProfile(userId, token);
      if (res.success) {
        setUserData(res.data);
      } else {
        toast.error(res.message || 'User profile data load failed!');
        return;
      }
    });
  };

  useEffect(() => {
    fetchUserProfileData();
  }, [userId]);

  if (!userData) {
    return;
  }

  const { lessons, totalComments, totalLikes, totalSaved, totalViews } =
    userData;

  const userStats = [
    { icon: BookOpen, label: 'Created', value: formateNumber(lessons?.length) },
    { icon: Bookmark, label: 'Saved', value: formateNumber(totalSaved) },
    { icon: Eye, label: 'Views', value: formateNumber(totalViews) },
    { icon: Heart, label: 'Likes', value: formateNumber(totalLikes) },
    {
      icon: MessageCircle,
      label: 'Comments',
      value: formateNumber(totalComments),
    },
  ];
  return (
    <div className="flex items-center">
      {userStats.map(({ icon: Icon, label, value }, index) => (
        <div key={label} className="flex">
          <div className="flex flex-col gap-0.5 text-center">
            <span className="text-2xl font-bold text-primary">{value}</span>
            <span className="md:text-sm text-xs text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
              <Icon className="md:size-4 size-3" /> {label}
            </span>
          </div>
          {userStats.length - 1 !== index && (
            <Separator orientation="vertical" className={'mx-5'}/>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersStates;
