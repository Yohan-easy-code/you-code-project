"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export function CourseDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = pathname.split("/").filter(Boolean).length === 2;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-w-6xl p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Course details</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
