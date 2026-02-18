"use client";

import { CATEGORIES, CATEGORY_LIST, type Category } from "@/constants/units";

interface TabsProps {
  active: Category;
  onChange: (category: Category) => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1" role="tablist">
      {CATEGORY_LIST.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
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
