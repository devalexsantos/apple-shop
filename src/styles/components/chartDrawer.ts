import { styled } from "..";

export const ChartDrawerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "$gray800",
  padding: "3rem",
  color: "$gray100",

  button: {
    float: "right",
    background: "none",
    color: "$gray100",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  h2: {
    marginTop: "1.5rem",
  },
});

export const ProductContainer = styled("div", {
  display: "flex",
  gap: "1.2rem",
  marginTop: "2rem",
});

export const ProductInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  p: {
    lineHeight: "1.6rem",
    fontSize: "$md",
  },

  span: {
    fontSize: "$md",
    fontWeight: "bold",
  },

  button: {
    marginTop: "auto",
    background: "none",
    border: "none",
    color: "$green300",
    fontWeight: "bold",
    fontSize: "$sm",
  },
});

export const ResumeContainer = styled("div", {
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  lineHeight: "2rem",

  div: {
    display: "flex",
    justifyContent: "space-between",
  },

  "div.price__resume": {
    fontWeight: "bold",
    fontSize: "$lg",
  },

  button: {
    marginTop: "3.5rem",
    padding: "1.25rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "$green500",
    color: "$gray100",
    fontSize: "$md",
    fontWeight: "bold",
    cursor: "pointer",
  },
});
