import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Agent, AgentDetails } from "@/Pages/dashboard";
import { SignIn, SignUp } from "@/Pages/auth";
import NewAgent from "../../admin/src/Pages/dashboard/NewAgent";

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
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Agents",
        path: "/agent",
        element: <Agent />,
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

  {
    layout: "dashboard",
    pages: [
      {
        name: "Agent Details",
        path: "/agentDetails",
        element: <AgentDetails />,
      },
      {
        name: "New Agent",
        path: "/newAgent",
        element: <NewAgent />,
      },
    ],
  },
];

export default routes;