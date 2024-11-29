"use client";
import { useBreadcrumbs } from "lib";
import React, { useEffect } from "react";

const Page = () => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { label: "RodoApp", href: "/" },
      { label: "Central", href: "/central" },
      { label: "Pré Notas" },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="h-full w-full flex justify-center items-center">
      Central de Pre Notas
    </div>
  );
};

export default Page;
