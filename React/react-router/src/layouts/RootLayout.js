import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About Us</NavLink>
          <NavLink to="help">Help</NavLink>
          <NavLink to="careers">Career</NavLink>
        </nav>
        <Breadcrumbs />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
