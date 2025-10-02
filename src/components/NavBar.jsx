import { NavLink } from "react-router";

function NavBar() {
  const menus = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Login", path: "/login" },
  ];

  return (
    <nav className="p-4 flex items-center justify-end gap-4">
      {menus.map((menu) => (
        <NavLink
          key={menu.id}
          className="hover:bg-green-500 px-4 py-2 duration-100 rounded-md"
          to={menu.path}
        >
          {menu.text}
        </NavLink>
      ))}
    </nav>
  );
}
export default NavBar;
