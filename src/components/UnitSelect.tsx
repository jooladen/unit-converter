"use client";

interface UnitOption {
  key: string;
  label: string;
}

interface UnitSelectProps {
  units: UnitOption[];
  value: string;
  onChange: (key: string) => void;
  ariaLabel: string;
}

export default function UnitSelect({
  units,
  value,
  onChange,
  ariaLabel,
}: UnitSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {units.map((unit) => (
        <option key={unit.key} value={unit.key}>
          {unit.label}
        </option>
      ))}
    </select>
  );
}
