import ActiveRideRider from "@/pages/Rider/ActiveRideRider";
import DriverRequest from "@/pages/Rider/DriverRequest";
import RequestRide from "@/pages/Rider/RequestRide";
import RideHistory from "@/pages/Rider/RideHistory";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Book Ride",
        url: "/rider/request-ride",
        component: RequestRide,
      },
      {
        title: "Active Ride",
        url: "/rider/active-ride-rider",
        component: ActiveRideRider,
      },
      {
        title: "Driver Request",
        url: "/rider/driver-request",
        component: DriverRequest,
      },
      {
        title: "Ride History",
        url: "/rider/ride-history",
        component: RideHistory,
      },
    ],
  },
];
