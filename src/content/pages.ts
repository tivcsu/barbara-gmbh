import aboutTeam from "@/public/images/about-team.jpg";
import heroOffice from "@/public/images/hero-office.jpg";
import serviceBuilding from "@/public/images/service-building.jpg";
import serviceMaintenance from "@/public/images/service-maintenance.jpg";

export const pageImages = {
  servicesHero: serviceBuilding,
  aboutHero: aboutTeam,
  aboutIntroduction: heroOffice,
  contactHero: serviceMaintenance,
} as const;
