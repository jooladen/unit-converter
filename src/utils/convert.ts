import { LENGTH_UNITS, WEIGHT_UNITS, type Category } from "@/constants/units";

const DECIMAL_PLACES = 4;

function formatResult(value: number): string {
  if (!isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER) {
    return "범위 초과";
  }
  return parseFloat(value.toFixed(DECIMAL_PLACES)).toString();
}

function convertByRatio(
  value: number,
  fromKey: string,
  toKey: string,
  units: { key: string; ratioToBase: number }[]
): string {
  const fromUnit = units.find((u) => u.key === fromKey);
  const toUnit = units.find((u) => u.key === toKey);

  if (!fromUnit || !toUnit) return "0";

  const baseValue = value * fromUnit.ratioToBase;
  const result = baseValue / toUnit.ratioToBase;

  return formatResult(result);
}

function convertTemperature(
  value: number,
  fromKey: string,
  toKey: string
): string {
  if (fromKey === toKey) return formatResult(value);

  let result: number;

  if (fromKey === "celsius" && toKey === "fahrenheit") {
    result = (value * 9) / 5 + 32;
  } else if (fromKey === "celsius" && toKey === "kelvin") {
    result = value + 273.15;
  } else if (fromKey === "fahrenheit" && toKey === "celsius") {
    result = ((value - 32) * 5) / 9;
  } else if (fromKey === "fahrenheit" && toKey === "kelvin") {
    result = ((value - 32) * 5) / 9 + 273.15;
  } else if (fromKey === "kelvin" && toKey === "celsius") {
    result = value - 273.15;
  } else if (fromKey === "kelvin" && toKey === "fahrenheit") {
    result = ((value - 273.15) * 9) / 5 + 32;
  } else {
    return "0";
  }

  return formatResult(result);
}

export interface ConvertResult {
  value: string;
  warning?: string;
}

export function convert(
  inputValue: number,
  fromKey: string,
  toKey: string,
  category: Category
): ConvertResult {
  if (fromKey === toKey) {
    return { value: formatResult(inputValue) };
  }

  if (category === "length") {
    return { value: convertByRatio(inputValue, fromKey, toKey, LENGTH_UNITS) };
  }

  if (category === "weight") {
    return { value: convertByRatio(inputValue, fromKey, toKey, WEIGHT_UNITS) };
  }

  // temperature
  const resultStr = convertTemperature(inputValue, fromKey, toKey);

  // 켈빈 결과가 음수인 경우
  if (toKey === "kelvin") {
    const resultNum = parseFloat(resultStr);
    if (!isNaN(resultNum) && resultNum < 0) {
      return { value: "0", warning: "절대영도(0K) 이하입니다" };
    }
  }

  return { value: resultStr };
}
