import React, { useState } from "react";
import { FloatingButton } from "./FloatingButton";
import { Drawer } from "./Drawer";

export const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {!isDrawerOpen && (
        <FloatingButton onClick={() => setIsDrawerOpen(true)} />
      )}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
