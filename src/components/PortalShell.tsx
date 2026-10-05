import type { ReactNode } from "react";
import { PortalNav } from "./PortalNav";

type Me = Parameters<typeof PortalNav>[0]["me"];

export function PortalShell({ me, active, children }: { me: Me; active: "dashboard" | "admin" | "users"; children: ReactNode }) {
  return <div className="react-portal-app"><PortalNav me={me} active={active}/>{children}</div>;
}
