"use client";

import { StatsCards } from "@/components/admin/StatsCards";

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="font-serif-display text-3xl text-espresso">Overview</h1>
      <p className="mt-1 text-sm text-espresso/55">Business health at a glance.</p>
      <div className="mt-8">
        <StatsCards />
      </div>
    </div>
  );
}
