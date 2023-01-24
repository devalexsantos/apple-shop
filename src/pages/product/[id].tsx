import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticProps, GetStaticPaths } from "next";
import Stripe from "stripe";
import Image from "next/image";

import { useRouter } from "next/router";
import axios from "axios";
import { useContext } from "react";
import Head from "next/head";
import { ShopCartContext } from "@/contexts/ShopCart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
    priceUnit: number;
  };
  stateDrawer: (state: boolean) => void;
}

export default function Product({ product, stateDrawer }: ProductProps) {
  const { isFallback } = useRouter();
  const { addProductCart } = useContext(ShopCartContext);

  /*const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);*/

  function handleAddCartProduct(
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

  /*async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }
  */

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={576} height={576} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>R$ 79,90</span>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum quia
            nesciunt, voluptatem voluptatibus in nulla saepe similique eius
            laboriosam debitis praesentium deserunt vero provident dignissimos
            modi. Esse suscipit eum molestias.
          </p>

          <button
            onClick={() =>
              handleAddCartProduct(
                product.id,
                product.price,
                product.name,
                product.imageUrl,
                product.priceUnit,
                product.defaultPriceId
              )
            }
          >
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_NDSYkuK4NqiiNx",
        },
      },
      {
        params: {
          id: "prod_NDSX2CVPbU3fKQ",
        },
      },
      {
        params: {
          id: "prod_NDSWxxaQ2vbMhW",
        },
      },
      {
        params: {
          id: "prod_NDSVVY89zLidD9",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount as number) / 100),
        defaultPriceId: price.id,
        priceUnit: price.unit_amount as number,
      },
    },
    revalidate: 60 * 60 * 1, //  1hour
  };
};
