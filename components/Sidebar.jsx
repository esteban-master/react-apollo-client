import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../services/authcontext.service";

const Sidebar = () => {
  const { pathname } = useRouter();
  const [user] = useAuth();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-sreen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
        {user.email && (
          <>
            <li
              className={pathname === "/clientes" ? "bg-blue-800 p-2" : "p-2"}
            >
              <Link href="/clientes">
                <a className="text-white block">Clientes</a>
              </Link>
            </li>
            <li className={pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"}>
              <Link href="/pedidos">
                <a className="text-white block">Pedidos</a>
              </Link>
            </li>
          </>
        )}

        <li className={pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/productos">
            <a className="text-white block">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
