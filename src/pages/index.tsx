import { useContext, useState } from "react";
import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
    defaultPriceId: string;
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
    priceUnit: number,
    defaultPriceId: string
  ) {
    addProductCart(id, price, name, imageUrl, priceUnit, defaultPriceId);
    stateDrawer(true);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 32,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="navigation-wrapper">
        <div className="keen-slider">
          {products.map((product, index) => {
            return (
              <Product
                className={`keen-slider__slide number-slide${index + 1}`}
                key={product.id}
              >
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
                        product.priceUnit,
                        product.defaultPriceId
                      )
                    }
                  >
                    <ShoppingCart size={24} />
                  </button>
                </footer>
              </Product>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </HomeContainer>
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
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
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
