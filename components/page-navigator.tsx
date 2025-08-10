"use client";

import { cn } from "@/lib/utils";
import useQueryParams from "@/utils/useQueryParams";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export default function PageNavigator({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const { setQueryParams } = useQueryParams();
  let buttons: Array<React.JSX.Element> = [];

  if (pageCount < 2) return null;

  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <PageButton key={i} number={i} active={currentPage === i} />
      );
    }
  } else {
    let show = 5;

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = currentPage + (show - currentPage);
    }
    if (end > pageCount) {
      end = pageCount;
      start = currentPage - (show - 1 - (pageCount - currentPage));
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <PageButton key={i} number={i} active={currentPage === i} />
      );
    }
  }

  function nextPage() {
    if (currentPage !== pageCount) {
      setQueryParams({ page: currentPage + 1 });
    }
  }

  function lastPage() {
    if (currentPage > 1) {
      setQueryParams({ page: currentPage - 1 });
    }
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="border rounded-full h-7 flex overflow-hidden justify-between w-full max-w-lg">
        <div
          onClick={() => lastPage()}
          className={cn(
            "basis-full text-center cursor-pointer flex items-center justify-center hover:bg-neutral-800",
            currentPage <= 1 && "opacity-30 cursor-default hover:bg-neutral-800"
          )}
        >
          <ArrowLeft size={15} />
        </div>
        {buttons.map((button) => button)}
        <div
          onClick={() => nextPage()}
          className={cn(
            "basis-full text-center cursor-pointer flex items-center justify-center hover:bg-neutral-800",
            currentPage === pageCount &&
              "opacity-30 cursor-default hover:bg-neutral-800"
          )}
        >
          <ArrowRight size={15} />
        </div>
      </div>
    </div>
  );
}

function PageButton({ active, number }: { active: boolean; number: number }) {
  const { setQueryParams } = useQueryParams();

  return (
    <div
      className={cn(
        "basis-full flex items-center justify-center text-sm cursor-pointer hover:bg-neutral-800",
        active && " bg-purple-800 text-white hover:bg-purple-900"
      )}
      onClick={() => {
        setQueryParams({ page: number });
      }}
    >
      {number}
    </div>
  );
}
