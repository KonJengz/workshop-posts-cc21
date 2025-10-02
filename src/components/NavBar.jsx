import { NavLink } from "react-router";

function NavBar() {
  const menus = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Login", path: "/login" },
  ];

  return (
    <nav className="p-2 flex items-center justify-end gap-2 shadow">
      {menus.map((menu) => (
        <NavLink
          key={menu.id}
          className="hover:bg-green-500 px-2 py-1 duration-100 rounded-md"
          to={menu.path}
        >
          {menu.text}
        </NavLink>
      ))}
    </nav>
  );
}
export default NavBar;
