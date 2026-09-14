"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/shared/components/atoms/Button";
interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    /** Translated word for "of", e.g. "of" / "من". Defaults to "of". */
    ofLabel?: string;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    ofLabel = "of",
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

    // Build a compact page list with ellipsis for large page counts,
    // e.g. [1, "...", 4, 5, 6, "...", 42]
    const pageItems: (number | "ellipsis")[] = (() => {
        const SIBLINGS = 1;
        const totalVisible = SIBLINGS * 2 + 5; // first, last, current, 2 ellipses

        if (totalPages <= totalVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const start = Math.max(currentPage - SIBLINGS, 2);
        const end = Math.min(currentPage + SIBLINGS, totalPages - 1);

        const items: (number | "ellipsis")[] = [1];
        if (start > 2) items.push("ellipsis");
        for (let page = start; page <= end; page++) items.push(page);
        if (end < totalPages - 1) items.push("ellipsis");
        items.push(totalPages);
        return items;
    })();

    return (
      <div
        className={cn(
          " ds-border-gray flex flex-col gap-4 border-t px-5 py-4",
          "sm:flex-row sm:items-center sm:justify-between",
          className,
        )}>
        {/* Items count */}
        <p className="ds-text-secondary text-sm">
          {startItem} - {endItem} {ofLabel} {totalItems}
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

          {pageItems.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="ds-text-secondary px-2 text-sm select-none">
                …
              </span>
            ) : (
              <Button
                key={page}
                type="button"
                variant={page === currentPage ? "primary" : "ghost"}
                size="icon"
                onClick={() => onPageChange(page)}>
                {page}
              </Button>
            ),
          )}

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