"use client";

import { Vortex } from "$/components/aceternity";
import LoginCard from "%/components/card"; // Caminho para o componente LoginCard
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-white w-full h-screen relative flex items-center justify-center">
    <Vortex
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <LoginCard />
      </Vortex>
    </div>
  );
};

export default LoginPage;
