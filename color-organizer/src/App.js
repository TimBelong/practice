import React, { useState } from "react";
import colorData from "./color-data.json";
import ColorList from "./colorList";
import AddColorForm from "./AddColorForm";

export default function App() {
  return (
    <>
      <AddColorForm />
      <ColorList />
    </>
  );
}
