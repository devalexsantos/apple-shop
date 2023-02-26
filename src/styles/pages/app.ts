import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  "a": {
    textDecoration: "none"
  },

  "h1":{
    color: "white",
  },

  "div.button_shop_cart": {
    position: "relative",
    button: {
      backgroundColor: "$gray800",
      border: 0,
      color: "$gray100",
      padding: "0.75rem",
      borderRadius: 6,
      cursor: "pointer",
    },

    div: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      borderRadius: "50%",
      backgroundSize: "cover",
      width: "26px",
      height: "26px",
      overflow: "hidden",
      top: -10,
      right: -10,
      backgroundColor: "$green500",
      border: "1px solid $gray800",
    },
  },
});

export const Footer = styled("footer", {
  marginTop: "4rem",
  marginBottom: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px 10px",
  borderRadius: "6px"
})
