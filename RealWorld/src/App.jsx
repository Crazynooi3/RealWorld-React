import React from "react";
import routes from "./Routes";
import { useRoutes } from "react-router-dom";

function App() {
  const router = useRoutes(routes);
  return <>{router}</>;
}

export default App;
