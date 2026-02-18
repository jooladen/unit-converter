"use client";

import { useCallback } from "react";
import { CATEGORIES, CATEGORY_LIST, type Category } from "@/constants/units";

interface TabsProps {
  active: Category;
  onChange: (category: Category) => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = CATEGORY_LIST.indexOf(active);
      let nextIndex: number | null = null;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % CATEGORY_LIST.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex =
          (currentIndex - 1 + CATEGORY_LIST.length) % CATEGORY_LIST.length;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        onChange(CATEGORY_LIST[nextIndex]);
      }
    },
    [active, onChange]
  );

  return (
    <div
      className="flex gap-1 bg-gray-100 rounded-lg p-1"
      role="tablist"
      aria-label="단위 카테고리"
      onKeyDown={handleKeyDown}
    >
      {CATEGORY_LIST.map((cat) => (
        <button
          key={cat}
          role="tab"
          id={`tab-${cat}`}
          aria-selected={active === cat}
          aria-controls={`tabpanel-${cat}`}
          tabIndex={active === cat ? 0 : -1}
          onClick={() => onChange(cat)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            active === cat
              ? "bg-blue-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          {CATEGORIES[cat].label}
        </button>
      ))}
    </div>
  );
}
