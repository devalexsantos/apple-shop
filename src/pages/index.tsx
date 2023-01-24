import { useContext } from "react";
import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Link from "next/link";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Head from "next/head";

import { ShoppingCart } from "phosphor-react";
import { ShopCartContext } from "@/contexts/ShopCart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceUnit: number;
  }[];
  stateDrawer: (state: boolean) => void;
}

export default function Home({ products, stateDrawer }: HomeProps) {
  const { addProductCart } = useContext(ShopCartContext);

  function handleAddProductCart(
    id: string,
    price: string,
    name: string,
    imageUrl: string,
    priceUnit: number
  ) {
    addProductCart(id, price, name, imageUrl, priceUnit);
    stateDrawer(true);
  }

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 32,
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={420}
                  alt=""
                  priority
                />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <button
                  onClick={(e) =>
                    handleAddProductCart(
                      product.id,
                      product.price,
                      product.name,
                      product.imageUrl,
                      product.priceUnit
                    )
                  }
                >
                  <ShoppingCart size={24} />
                </button>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
      priceUnit: price.unit_amount as number,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
