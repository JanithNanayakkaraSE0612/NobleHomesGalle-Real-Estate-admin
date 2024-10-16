import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Agent, AgentDetails } from "@/Pages/dashboard";
import { SignIn, SignUp } from "@/Pages/auth";
import NewAgent from "./Pages/dashboard/NewAgent";

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
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Customer",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Agents",
        path: "/agent",
        element: <Agent />,
      },
      {
        icon: <ChatBubbleBottomCenterIcon {...icon} />,
        name: "Messages",
        path: "/notifications",
        element: <Notifications />,
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
