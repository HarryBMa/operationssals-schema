import { Link } from "react-router-dom";
import "@/styles/nav.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  return (
    <nav className="nav">
      <input type="checkbox" id="nav-cb" className="nav__cb" />
      <label htmlFor="nav-cb" className="nav__btn" aria-label="Öppna meny"></label>
      <div className="nav__content">
        <ul className="nav__items">
          {navItems.map((item) => (
            <li key={item.to} className="nav__item">
              <Link to={item.to} className="nav__item-text">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
