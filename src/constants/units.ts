export type Category = "length" | "weight" | "temperature";

export interface Unit {
  key: string;
  label: string;
  ratioToBase: number;
}

export interface TemperatureUnit {
  key: string;
  label: string;
}

export interface CategoryConfig {
  label: string;
  defaultFrom: string;
  defaultTo: string;
}

// 길이 단위 (기준: m)
export const LENGTH_UNITS: Unit[] = [
  { key: "mm", label: "밀리미터 (mm)", ratioToBase: 0.001 },
  { key: "cm", label: "센티미터 (cm)", ratioToBase: 0.01 },
  { key: "m", label: "미터 (m)", ratioToBase: 1 },
  { key: "km", label: "킬로미터 (km)", ratioToBase: 1000 },
  { key: "inch", label: "인치 (in)", ratioToBase: 0.0254 },
  { key: "feet", label: "피트 (ft)", ratioToBase: 0.3048 },
  { key: "yard", label: "야드 (yd)", ratioToBase: 0.9144 },
  { key: "mile", label: "마일 (mi)", ratioToBase: 1609.344 },
];

// 무게 단위 (기준: g)
export const WEIGHT_UNITS: Unit[] = [
  { key: "mg", label: "밀리그램 (mg)", ratioToBase: 0.001 },
  { key: "g", label: "그램 (g)", ratioToBase: 1 },
  { key: "kg", label: "킬로그램 (kg)", ratioToBase: 1000 },
  { key: "ton", label: "톤 (t)", ratioToBase: 1000000 },
  { key: "oz", label: "온스 (oz)", ratioToBase: 28.3495 },
  { key: "lb", label: "파운드 (lb)", ratioToBase: 453.592 },
];

// 온도 단위
export const TEMPERATURE_UNITS: TemperatureUnit[] = [
  { key: "celsius", label: "섭씨 (℃)" },
  { key: "fahrenheit", label: "화씨 (℉)" },
  { key: "kelvin", label: "켈빈 (K)" },
];

// 카테고리 설정
export const CATEGORIES: Record<Category, CategoryConfig> = {
  length: {
    label: "길이",
    defaultFrom: "m",
    defaultTo: "cm",
  },
  weight: {
    label: "무게",
    defaultFrom: "kg",
    defaultTo: "lb",
  },
  temperature: {
    label: "온도",
    defaultFrom: "celsius",
    defaultTo: "fahrenheit",
  },
};

export const CATEGORY_LIST: Category[] = ["length", "weight", "temperature"];
