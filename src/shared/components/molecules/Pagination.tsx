"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/shared/components/atoms/Button";
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    className,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
        currentPage * itemsPerPage,
        totalItems,
    );

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );

    return (
      <div
        className={cn(
          " ds-border-gray flex flex-col gap-4 border-t px-5 py-4",
          "sm:flex-row sm:items-center sm:justify-between",
          className,
        )}>
        {/* Items count */}
        <p className="ds-text-secondary text-sm">
          {startItem} - {endItem} من {totalItems}
        </p>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page">
            <ChevronRight />
          </Button>

          {pages.map((page) => (
            <Button
              key={page}
              type="button"
              variant={page === currentPage ? "primary" : "ghost"}
              size="icon"
              onClick={() => onPageChange(page)}>
              {page}
            </Button>
          ))}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page">
            <ChevronLeft />
          </Button>
        </div>
      </div>
    );
}