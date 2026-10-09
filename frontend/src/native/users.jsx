import React from "react";
import { Page as Layout } from "../parity/users.jsx";
import { Shared } from "./Shared.jsx";
import { UsersProvider } from "./UsersManagement.jsx";
import {
  PortalNavigation,
  installPortalNavigation,
} from "./PortalNavigation.jsx";
import { SourceStatus } from "./SourceStatus.jsx";
installPortalNavigation();
export function Page() {
  return (
    <Shared>
      <UsersProvider>
        <Layout />
        <PortalNavigation />
        <SourceStatus />
      </UsersProvider>
    </Shared>
  );
}
