import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  costumerName: string;
  products: {
    id: string;
    price: {
      product: {
        images: string[];
      };
    };
    quantity: number;
  }[];
}

export default function Success({ costumerName, products }: SuccessProps) {
  const totalProductsQUantity = products.reduce(
    (total, item) => (total += item.quantity),
    0
  );

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          {products.map((product) => (
            <div className="image_content" key={product.id}>
              <Image
                src={product.price.product.images[0]}
                width={150}
                height={150}
                alt="imagem do produto"
              />
              <div className="quantity_product">
                <span>{product.quantity}</span>
              </div>
            </div>
          ))}
        </ImageContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
          {totalProductsQUantity} camiseta(s) já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  console.log(session.line_items.data);

  const costumerName = session.customer_details.name;
  const products = session.line_items.data;

  return {
    props: {
      costumerName,
      products,
    },
  };
};
