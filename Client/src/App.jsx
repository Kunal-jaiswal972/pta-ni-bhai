import React from "react";
import { Container } from "@mui/material";
import TabComponent from "./components/tabComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Test from "./components/test";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container component="main" maxWidth="xs">
        <Test/>
        <TabComponent />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
