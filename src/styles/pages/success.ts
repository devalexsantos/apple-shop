import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
  },

  a: {
    marginTop: "5rem",
    textDecoration: "none",
    color: "$green500",
    fontSize: "$lg",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageContainer = styled("main", {
  backgroundSize: "cover",
  padding: "0.25rem",
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
    maxWidth: 150,
    height: 150,
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: "50%",
    margin: "0px -20px",
    "-webkit-box-shadow": "-3px 1px 5px 1px rgba(0,0,0,0.68)",
    "-moz-box-shadow": "-3px 1px 5px 1px rgba(0,0,0,0.68)",
    "box-shadow": "-3px 1px 5px 1px rgba(0,0,0,0.68)",
  },

  "div.image_content": {
    position: "relative",
  },

  "div.quantity_product": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: "50%",
    backgroundSize: "cover",
    width: "26px",
    height: "26px",
    bottom: 0,
    left: 0,
    backgroundColor: "$green500",
    border: "1px solid $gray800",
  },
});
