import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08080a",
          deep: "#040405",
          light: "#121217",
        },
        charcoal: {
          DEFAULT: "#111116",
          dark: "#0d0d12",
          border: "#1f1f28",
        },
        night: {
          DEFAULT: "#0b0f19",
          deep: "#070a12",
        },
        wine: {
          DEFAULT: "#190b14",
          subtle: "#25101e",
        },
        parchment: {
          DEFAULT: "#f4efe6",
          muted: "#c8c0b2",
          dim: "#8f877a",
        },
        gold: {
          DEFAULT: "#c6a052",
          light: "#dfb76c",
          dark: "#9a7836",
          glow: "rgba(198, 160, 82, 0.25)",
        },
        silver: {
          DEFAULT: "#8e97a4",
          light: "#b4bcc7",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 8px rgba(198, 160, 82, 0.3))" },
          "100%": { opacity: "0.9", filter: "drop-shadow(0 0 18px rgba(198, 160, 82, 0.7))" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #dfb76c 0%, #c6a052 50%, #9a7836 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(26, 26, 36, 0.75) 0%, rgba(14, 14, 20, 0.95) 100%)",
        "radial-mystic": "radial-gradient(circle at 50% 30%, rgba(25, 11, 20, 0.4) 0%, rgba(8, 8, 10, 0.98) 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
