import { useState, useContext } from "react";
import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";
import logoIgnite from "../assets/logo.svg";
import Link from "next/link";
import { ShoppingCart } from "phosphor-react";
import { ChartDrawer } from "@/components/ChartDrawer";
import { ShopCartProvider } from "@/contexts/ShopCart";
import ShopCartButton from "@/components/ShopCartButton";

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
            <Image src={logoIgnite} alt="" />
          </Link>
          <ShopCartButton handleSetDrawerState={handleSetDrawerState} />
          <ChartDrawer
            state={drawerState}
            changeState={() => handleSetDrawerState(false)}
          />
        </Header>
        <Component {...pageProps} stateDrawer={handleSetDrawerState} />
      </Container>
    </ShopCartProvider>
  );
}
