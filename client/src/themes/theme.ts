export const theme = {
  rounded: {
    sm: "4px",
    md: "8px",
    lg: "0.5rem",
  },
  shadow: {
    sm: "0 0 9px #0000001A",
    md: "",
    lg: "",
  },
  colors: {
    main: "#4d586f",
    sub: "#252d3d",
    background: "#e8e9f0",
    text: "#000000",
    subText: "#ffffff",
  },
  font: `Saira, sans-serif`,
  fontSizes: {
    xxs: "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.625rem",
    xxl: "2rem",
    xxxl: "3rem",
  },
};

export type ThemeProps = typeof theme;
