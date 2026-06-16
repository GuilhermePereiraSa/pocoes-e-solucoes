import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand">Poções e Soluções</span>
      <ul className="navbar-nav invisible-bullets">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Loja
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link">
            Gerenciamento
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
