export const theme = {
  rounded: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
  },
  sizes: {
    sm: "0.5rem",
    md: "1.25rem",
    lg: "2rem",
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
