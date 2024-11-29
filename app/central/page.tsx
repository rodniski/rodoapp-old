"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// Importação dinâmica dos componentes
const ShootingStarsDynamic = dynamic(
  () => import("components/aceternity/shooting-stars"),
  { ssr: false }
);
const StarsBackgroundDynamic = dynamic(
  () => import("components/aceternity/stars-background"),
  { ssr: false }
);
const BentoInicial = dynamic(() => import("&/central"), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-indigo-950">
        <div className="z-50">
          <div className="text-center pb-14 bg-gradient-to-r from-blue-500 via-indigo-300 to-violet-500 text-transparent bg-clip-text">
            <h1 >
              Central de Apps
            </h1>
          </div>

          <Suspense fallback={<div>Carregando...</div>}>
            <BentoInicial />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <ShootingStarsDynamic />
          <StarsBackgroundDynamic />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
