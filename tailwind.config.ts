import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rp: {
          primary: {
            DEFAULT: "#3E54D3",
          },
          green: {
            mint: "#00E8A2",
            100: "#00B881",
            200: "#ECFDF3",
            400: "#86EFAC",
            500: "#DCFCE7",
          },
          blue: {
            DEFAULT: "#3E54D3",
            dark: "#001F3F",
          },
          red: {
            100: "#EF4444",
          },
          grey: {
            100: "#667085",
            200: "#101828",
            300: "#344054",
            400: "#D0D5DD",
            500: "#E5E7EB",
            600: "#F5F5FF",
            700: "#F3F4F6",
            800: "#D1D5DB",
            border: "#D1D5DB",
            900: "#6B7280",
            1000: "#F9FAFB",
            1100: "#111827",
            1200: "#E1E1FE",
            1300: "#F9FAFB",
            1400: "#F2F4F7",
            1500: "#374151",
            1600: "#E4E7EC",
            1700: "#4B5563",
            1800: "#1F2937",
          },
          purple: {
            100: "#9B9DFD",
            200: "#E1E1FE",
            300: "#4B4EFC",
          },
        },
      },
      fontFamily: {
        space_grotesk: ["var(--font-space-grotesk)"],
      },
      boxShadow: {
        input: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        bottom_nav:
          "0px -1px 8px rgba(16, 24, 40, 0.04), 0px -1px 8px -1px rgba(16, 24, 40, 0.04);",
        large:
          "0px 10px 15px -3px rgba(16, 24, 40, 0.1), 0px 4px 6px -4px rgba(16, 24, 40, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-app-banner": "url('/images/logo-icon-blue.png')",
      },
    },
  },
  plugins: [],
}
export default config
