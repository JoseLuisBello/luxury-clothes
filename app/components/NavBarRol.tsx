"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // <--- Importante
import NavBar from "./NavBar";
import NavBarLogistica from "./NavBarLogistica";

export default function NavBarRol(props: any) {
  const [rol, setRol] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname(); // Escucha cambios de URL

  useEffect(() => {
    const checkAuth = () => {
      const rolStorage = localStorage.getItem("rol");
      setRol(rolStorage ? Number(rolStorage) : 1);
      setReady(true);
    };

    checkAuth();
  }, [pathname]); // <--- Cada vez que cambies de página, volverá a leer el localStorage

  if (!ready) return null;

  return rol === 3 || rol === 4 ? <NavBarLogistica /> : <NavBar {...props} />;
}