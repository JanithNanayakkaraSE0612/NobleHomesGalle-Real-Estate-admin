import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Total Property",
    value: "102",
    footer: {
      color: "text-green-500", 
      value: "+18%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Lands",
    value: "3",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total House",
    value: "5",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Customer",
    value: "8",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
