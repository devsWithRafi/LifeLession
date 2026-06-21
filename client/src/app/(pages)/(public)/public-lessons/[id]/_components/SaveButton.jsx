'use client';

import { Button } from '@/components/ui/button';
import { FiBookmark } from 'react-icons/fi';

const SaveButton = ({ lesson }) => {
  return (
    <Button variant="outline">
      <FiBookmark />
      <span className="hidden sm:inline">Save</span>
    </Button>
  );
};

export default SaveButton;
