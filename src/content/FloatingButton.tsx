import React from "react";

interface FloatingButtonProps {
  onClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      className="montara-floating-button"
      style={{
        position: "fixed",
        right: "0",
        top: "54vh",
        transform: "translateY(-50%)",
        zIndex: 2147483647,
        padding: "12px",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        width: "50px",
        height: "50px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
      aria-label="Open Montara"
    >
      <img
        src={chrome.runtime.getURL("icons/logo_only_white.png")}
        alt="Montara"
        style={{
          width: "30px",
          height: "30px",
          objectFit: "contain",
        }}
      />
    </button>
  );
};
