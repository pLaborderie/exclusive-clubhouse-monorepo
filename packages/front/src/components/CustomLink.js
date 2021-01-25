import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom';

function CustomLink({ route }) {
  const match = useRouteMatch({
    path: route.link,
    exact: route.exact
  });

  const linkClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" + (match ? "" : " border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700");
  return (
    <NavLink
      to={route.link}
      className={linkClass}
      activeClassName="border-indigo-500 text-gray-900"
      exact={Boolean(route.exact)}
    >
      {route.name}
    </NavLink>
  )
}

export default CustomLink;
