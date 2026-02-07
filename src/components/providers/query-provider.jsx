"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }) => {
  const [useClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={useClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
