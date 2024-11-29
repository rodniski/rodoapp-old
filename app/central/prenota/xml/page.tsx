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
      { label: "Importação de XML" },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="h-full w-full flex justify-center items-center">
      Central de Importação 
    </div>
  );
};

export default Page;
