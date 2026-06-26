'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LessonsPagination = ({ pagination }) => {
  const { page, totalPage } = pagination;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber);

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    totalPage > 1 && (
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && changePage(page - 1)}
              aria-disabled={page === 1}
              className={page === 1 && 'pointer-events-none opacity-50'}
            />
          </PaginationItem>

          {[...Array(totalPage)].map((_, index) => {
            const pageNumber = index + 1;
            const isActive = page === pageNumber;

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => changePage(pageNumber)}
                  isActive={isActive}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPage && changePage(page + 1)}
              aria-disabled={page === totalPage}
              className={page === totalPage && 'pointer-events-none opacity-50'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
};

export default LessonsPagination;
