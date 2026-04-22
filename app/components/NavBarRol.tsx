"use client";

import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavBarLogistica from "./NavBarLogistica";

export default function NavBarRol(props: any) {
  const [rol, setRol] = useState<number | null>(null);

  useEffect(() => {
    const rolStorage = localStorage.getItem("rol");
    if (rolStorage) {
      setRol(Number(rolStorage));
    }
  }, []);

  // Loader opcional
  if (rol === null) return null;

  if (rol === 3 || rol === 4) {
    return <NavBarLogistica />;
  }

  return <NavBar {...props} />;
}