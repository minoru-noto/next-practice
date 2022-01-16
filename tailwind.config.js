module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["KintoSans", "sans-serif"],
        serif: ['"KintoSans"', "sans-serif"],
        mono: ['"KintoSans"', "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          DEFAULT: "#00a1e8",
          dark: "#008cdc",
          bright1: "#3ebdf3",
          bright2: "#a0dcff",
          bright3: "#eff9ff",
        },
        secondary: {
          DEFAULT: "#f44d60",
          dark: "#db2d40",
          bright1: "#f47676",
          bright2: "#ffb5b5",
          bright3: "#fff7f7",
        },
        accent1: {
          DEFAULT: "#5ac843",
          dark: "#40ae4b",
          bright1: "#8ada4b",
          bright2: "#b2f296",
          bright3: "#f5fff0",
        },
        accent2: {
          DEFAULT: "#ffa028",
          bright1: "#ffda89",
        },
        accent3: {
          DEFAULT: "#785ad2",
          bright1: "#ccbbf3",
        },
        body: {
          DEFAULT: "#263843",
        },
        gray1: {
          DEFAULT: "#878b93",
        },
        gray2: {
          DEFAULT: "#caced6",
        },
        gray3: {
          DEFAULT: "#ecedf0",
        },
        gray4: {
          DEFAULT: "#E3E5EA",
        },
        background1: {
          DEFAULT: "#ffffff",
        },
        background2: {
          DEFAULT: "#f4f7fa",
        },
      },
      screens: {
        mobile: { max: "520px" },
        landscape: { max: "1024px", orientation: "landscape" },
        tablet: { min: "521px", max: "1024px", orientation: "portrait" },
        pc: { min: "1025px" },
      },
    },
  },
  plugins: [],
};
