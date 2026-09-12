import React from "react";

export const MysticalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian"
    >
      {/* Resplandor superior sutil en vino oscuro y azul noche */}
      <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[50vh] rounded-full bg-wine/15 blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[60vh] rounded-full bg-night/25 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[55vw] h-[50vh] rounded-full bg-wine/10 blur-[130px]" />

      {/* Viñeta sutil perimetral */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,4,5,0.85)_100%)]" />

      {/* Textura sutil de ruido orgánico */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#c6a052 0.75px, transparent 0.75px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
};
