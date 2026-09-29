import aboutTeam from "@/public/images/about-team.jpg";
import heroOffice from "@/public/images/hero-office.jpg";
import serviceBuilding from "@/public/images/service-building.jpg";
import serviceDeep from "@/public/images/service-deep.jpg";
import serviceMaintenance from "@/public/images/service-maintenance.jpg";
import serviceOffice from "@/public/images/service-office.jpg";
import serviceWindow from "@/public/images/service-window.jpg";

export const homeImages = {
  hero: heroOffice,
  about: aboutTeam,
} as const;

export const homeServices = [
  {
    key: "maintenanceCleaning",
    anchor: "maintenance-cleaning",
    image: serviceMaintenance,
  },
  {
    key: "officeCleaning",
    anchor: "office-cleaning",
    image: serviceOffice,
  },
  {
    key: "buildingCleaning",
    anchor: "building-cleaning",
    image: serviceBuilding,
  },
  {
    key: "windowCleaning",
    anchor: "window-cleaning",
    image: serviceWindow,
  },
  {
    key: "deepCleaning",
    anchor: "deep-cleaning",
    image: serviceDeep,
  },
] as const;

export type HomeService = (typeof homeServices)[number];
