"use client";
import { useBreadcrumbs } from "lib";
import React, { useEffect } from "react";

const Page = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { label: "RodoApp", href: "/" },
      { label: "Central", href: "/central" },
      { label: "Pré Notas", href: "/central/prenota" },
      { label: "Lançamento Manual" },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="h-full w-full flex justify-center items-center">
      Central Importação Manual
    </div>
  );
};

export default Page;
