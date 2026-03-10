"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type CoursePaginationButtonProps = {
  totalPage: number;
  page: number;
  baseUrl: string;
};

export const CoursePaginationButton = ({
  totalPage,
  page,
  baseUrl,
}: CoursePaginationButtonProps) => {
  const router = useRouter();

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return;

    const searchParams = new URLSearchParams({
      page: String(newPage),
    });

    router.push(`${baseUrl}?${searchParams.toString()}`);
  };

  return (
    <div className="mt-4 flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPage}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};
