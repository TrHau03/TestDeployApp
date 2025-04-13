import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ainoshi | Admin Dashboard",
};

export default function AinoshiPage() {
  return (
    <div className="flex">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
        Role and Plan
      </h3>
    </div>
  );
}
