import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";
import UserState from "./context/user/UserState.tsx";

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
          <UserState>
            <App />
          </UserState>
        </SnackbarProvider>
      </React.StrictMode>
    </MantineProvider>
  </QueryClientProvider>
);
