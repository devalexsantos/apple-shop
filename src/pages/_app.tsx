import { useState, useContext } from "react";
import { globalStyles } from "@/styles/global";
import { Container, Footer, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";
import logoIgnite from "../assets/logo.svg";
import Link from "next/link";
import { ChartDrawer } from "@/components/ChartDrawer";
import { ShopCartProvider } from "@/contexts/ShopCart";
import ShopCartButton from "@/components/ShopCartButton";
import "../styles/styleSlider.css";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [drawerState, setDrawerState] = useState(false);

  function handleSetDrawerState(state: boolean) {
    setDrawerState(state);
  }

  return (
    <ShopCartProvider>
      <Container>
        <Header>
          <Link href="/">
            <h1>Apple Shop</h1>
          </Link>
          <ShopCartButton handleSetDrawerState={handleSetDrawerState} />
          <ChartDrawer
            state={drawerState}
            changeState={() => handleSetDrawerState(false)}
          />
        </Header>
        <Component {...pageProps} stateDrawer={handleSetDrawerState} />
      </Container>
      <Footer>Est loja é fictícia e foi criada para fins de estudos - Com amor 🖤
Alex Santos</Footer>
    </ShopCartProvider>
  );
}
