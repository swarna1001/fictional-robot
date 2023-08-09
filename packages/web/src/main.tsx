import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <React.StrictMode>
        <SnackbarProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </SnackbarProvider>
      </React.StrictMode>
    </MantineProvider>
  </QueryClientProvider>
);
