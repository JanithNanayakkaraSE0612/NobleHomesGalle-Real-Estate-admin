import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile} from "@/Pages/dashboard";
import { SignIn, SignUp } from "@/Pages/auth";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Property",
        path: "/profile",
        element: <Profile />,
        subPages: [
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "House Property",
            path: "/property/house",
            element: <HouseProperty />, 
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Land Property",
            path: "/property/land",
            element: <LandProperty />, 
          },
        ],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;