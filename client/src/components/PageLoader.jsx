import { cn } from '@/lib/utils';
import DataLoader from './Loader';

const PageLoader = ({ className }) => {
  return (
    <div
      className={cn(
        'w-screen h-screen flex items-center justify-center',
        className,
      )}
    >
      <DataLoader />
    </div>
  );
};

export default PageLoader;
