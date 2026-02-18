"use client";

import { useState, useMemo, useCallback } from "react";
import {
  type Category,
  CATEGORIES,
  LENGTH_UNITS,
  WEIGHT_UNITS,
  TEMPERATURE_UNITS,
} from "@/constants/units";
import { convert } from "@/utils/convert";
import UnitSelect from "./UnitSelect";

interface ConverterProps {
  category: Category;
}

function getUnits(category: Category) {
  switch (category) {
    case "length":
      return LENGTH_UNITS;
    case "weight":
      return WEIGHT_UNITS;
    case "temperature":
      return TEMPERATURE_UNITS;
  }
}

function canBeNegative(category: Category, fromUnit: string): boolean {
  return (
    category === "temperature" &&
    (fromUnit === "celsius" || fromUnit === "fahrenheit")
  );
}

function filterInput(
  raw: string,
  category: Category,
  fromUnit: string
): string {
  const allowMinus = canBeNegative(category, fromUnit);
  let result = "";
  let hasDecimal = false;

  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];
    if (char === "-" && allowMinus && result === "") {
      result += char;
    } else if (char === "." && !hasDecimal) {
      hasDecimal = true;
      result += char;
    } else if (char >= "0" && char <= "9") {
      result += char;
    }
  }

  return result;
}

export default function Converter({ category }: ConverterProps) {
  const config = CATEGORIES[category];
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState(config.defaultFrom);
  const [toUnit, setToUnit] = useState(config.defaultTo);

  const units = getUnits(category);

  const result = useMemo(() => {
    if (inputValue === "" || inputValue === "-" || inputValue === ".") {
      return { value: "0" };
    }
    const num = parseFloat(inputValue);
    if (isNaN(num)) return { value: "0" };
    return convert(num, fromUnit, toUnit, category);
  }, [inputValue, fromUnit, toUnit, category]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = filterInput(e.target.value, category, fromUnit);
      setInputValue(filtered);
    },
    [category, fromUnit]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      const input = e.currentTarget;
      const start = input.selectionStart ?? inputValue.length;
      const end = input.selectionEnd ?? inputValue.length;
      const newValue =
        inputValue.slice(0, start) + pasted + inputValue.slice(end);
      const filtered = filterInput(newValue, category, fromUnit);
      setInputValue(filtered);
    },
    [category, fromUnit, inputValue]
  );

  const handleFromUnitChange = useCallback(
    (newFromUnit: string) => {
      setFromUnit(newFromUnit);
      if (!canBeNegative(category, newFromUnit) && inputValue.startsWith("-")) {
        setInputValue(inputValue.slice(1));
      }
    },
    [category, inputValue]
  );

  const handleSwap = useCallback(() => {
    const newFrom = toUnit;
    const newTo = fromUnit;
    setFromUnit(newFrom);
    setToUnit(newTo);
    if (!canBeNegative(category, newFrom) && inputValue.startsWith("-")) {
      setInputValue(inputValue.slice(1));
    }
  }, [fromUnit, toUnit, category, inputValue]);

  const inputMode = canBeNegative(category, fromUnit) ? "text" : "decimal";

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* 입력 */}
        <div className="w-full sm:flex-1">
          <input
            type="text"
            inputMode={inputMode}
            value={inputValue}
            onChange={handleInputChange}
            onPaste={handlePaste}
            placeholder="0"
            aria-label="변환할 값"
            className="w-full p-4 text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-2">
            <UnitSelect
              units={units}
              value={fromUnit}
              onChange={handleFromUnitChange}
              ariaLabel="변환할 단위"
            />
          </div>
        </div>

        {/* 스왑 */}
        <button
          onClick={handleSwap}
          aria-label="단위 교체"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 transition-colors shrink-0"
        >
          ⇄
        </button>

        {/* 결과 */}
        <div className="w-full sm:flex-1">
          <div
            aria-label="변환 결과"
            aria-live="polite"
            className="w-full p-4 text-2xl bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]"
          >
            {result.value}
          </div>
          <div className="mt-2">
            <UnitSelect
              units={units}
              value={toUnit}
              onChange={setToUnit}
              ariaLabel="변환 결과 단위"
            />
          </div>
        </div>
      </div>

      {result.warning && (
        <p className="mt-3 text-sm text-red-500">{result.warning}</p>
      )}
    </div>
  );
}
