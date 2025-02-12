"use client";

import { QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { storage } from "@/lib/localforage";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60 * 24,
          gcTime: 1000 * 60 * 60 * 24,
        },
      },
    })
  );

  const asyncStoragePersister = createAsyncStoragePersister({ storage });

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister: asyncStoragePersister }}
      client={queryClient}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
