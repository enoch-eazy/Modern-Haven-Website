"use client";
import React, { ReactNode } from "react";
import { SessionProviders } from "./components/Providers";

type Props = {
  children: ReactNode;
};
const Providers = (props: Props) => {
  return (
    <SessionProviders>
      {props.children}
    </SessionProviders>
  );
};

export default Providers;
