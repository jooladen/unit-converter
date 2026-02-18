"use client";

import { useState } from "react";
import { type Category } from "@/constants/units";
import Tabs from "@/components/Tabs";
import Converter from "@/components/Converter";

export default function Home() {
  const [category, setCategory] = useState<Category>("length");

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 px-4">
      <h1 className="text-3xl font-bold mb-8">단위변환기</h1>
      <div className="w-full max-w-xl">
        <Tabs active={category} onChange={setCategory} />
        <div
          role="tabpanel"
          id={`tabpanel-${category}`}
          aria-labelledby={`tab-${category}`}
        >
          <Converter key={category} category={category} />
        </div>
      </div>
    </main>
  );
}
