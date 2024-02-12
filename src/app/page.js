"use client";
import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import AttendanceForm from "./components/AttendanceForm";
const App = () => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          // override dark colors here to change them for all components
          dark: [
            "#d5d7e0",
            "#acaebf",
            "#8c8fa3",
            "#666980",
            "#4d4f66",
            "#34354a",
            "#2b2c3d",
            "#1d1e30",
            "#0c0d21",
            "#01010a",
          ],
        },
      }}
    >
      <div>
        <AttendanceForm />
      </div>
    </MantineProvider>
  );
};

export default App;
