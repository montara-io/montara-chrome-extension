import React from "react";

interface PopupProps {
  selectedText: string;
  position: { x: number; y: number };
  onProcess: () => void;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({
  selectedText,
  position,
  onProcess,
  onClose,
}) => {
  return (
    <div
      className="montara-popup"
      style={{
        position: "fixed",
        zIndex: 10001,
        left: position.x,
        top: position.y,
        padding: "16px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "300px",
      }}
    >
      <h3 style={{ margin: "0 0 12px 0" }}>Create Montara Model</h3>
      <div style={{ marginBottom: "12px", fontSize: "14px" }}>
        {selectedText}
      </div>
      <button
        onClick={onProcess}
        style={{
          padding: "8px 16px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Process
      </button>
    </div>
  );
};
