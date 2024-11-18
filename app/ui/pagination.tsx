"use client";
import { Center, Group } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  count: number;
  pageSize: number;
}

export const Pagination = (props: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const { count, pageSize } = props;

  return (
    <Center>
      <PaginationRoot
        className="information-pagination"
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => {
          const newPageURL = createPageURL(e.page);
          router.push(newPageURL);
          // always redirect the focus back to page count for A11y
          document.getElementById("page-count-description")?.focus();
        }}
        siblingCount={2}
        page={currentPage}
      >
        <Group attached>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </Group>
      </PaginationRoot>
    </Center>
  );
};
