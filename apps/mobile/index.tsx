import { Redirect } from "expo-router";

import { useMobileAuth } from "@/components/mobile/mobile-auth-provider";

export default function Index() {
  const { isAuthenticated, isHydrating } = useMobileAuth();

  if (isHydrating) {
    return null;
  }

  return <Redirect href={isAuthenticated ? "/home" : "/login"} />;
}
