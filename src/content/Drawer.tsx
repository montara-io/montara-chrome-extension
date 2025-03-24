import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 999998,
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100%",
          background: "white",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
          zIndex: 999999,
          padding: "24px",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2>Sample Content</h2>
        <div style={{ marginTop: "20px" }}>
          <h3>Example 1</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            {`<div class="sample">
  <h1>Hello World</h1>
  <p>This is a sample HTML content</p>
</div>`}
          </pre>

          <h3>Example 2</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            {`<section class="hero">
  <h2>Welcome to our site</h2>
  <button class="cta">Get Started</button>
</section>`}
          </pre>
        </div>
      </div>
    </>
  );
};
