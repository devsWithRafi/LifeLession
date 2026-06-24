'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Camera, Edit3 } from 'lucide-react';
import React, { useState } from 'react';
import UserProfileUpdateModal from '../UserProfileUpdateModal';

const ProfileSetting = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Quick settings */}
        <Card className="p-5 flex-1">
          <h3 className="font-semibold text-foreground mb-1">
            Profile Settings
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Update your display name or photo any time
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Display Name
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={user?.name}
                  readOnly
                  className="bg-muted/40 cursor-default"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="shrink-0 h-9 w-9"
                  onClick={() => setModalOpen(true)}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">
                Profile Photo
              </label>
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="w-full"
              >
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>
          </div>
        </Card>

        {/* Account meta */}
        <Card className="p-5">
          <h3 className="font-semibold text-foreground mb-3">Account Info</h3>
          <div className="space-y-3">
            {[
              { label: 'Role', value: user?.role },
              { label: 'Plan', value: user?.plan },
              { label: 'Email Verified', value: 'Yes' },
              { label: 'User ID', value: user?.id },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center capitalize"
              >
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded-md">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* profile settings modal */}
      <UserProfileUpdateModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
};

export default ProfileSetting;
