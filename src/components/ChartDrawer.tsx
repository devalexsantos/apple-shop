import { useContext } from "react";
import { ShopCartContext } from "@/contexts/ShopCart";
import {
  ChartDrawerContainer,
  ProductContainer,
  ProductInfoContainer,
  ResumeContainer,
} from "@/styles/components/chartDrawer";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import { X } from "phosphor-react";

interface ChartDrawerProps {
  state: boolean;
  changeState: () => void;
}

export function ChartDrawer({ state, changeState }: ChartDrawerProps) {
  const { products, amount, quantity, removeProductCart } =
    useContext(ShopCartContext);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      changeState();
    };

  return (
    <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
      {products.length === 0 ? (
        <ChartDrawerContainer>
          <p>Nenhum produto no carrinho...</p>
          <ResumeContainer>
            <button>Ir as Compras</button>
          </ResumeContainer>
        </ChartDrawerContainer>
      ) : (
        <ChartDrawerContainer>
          <div>
            <button onClick={changeState}>
              <X fontWeight="bold" size={24} />
            </button>
          </div>
          <h2>Sacola de compras</h2>
          {products.map((product) => (
            <ProductContainer key={product.id}>
              <Image src={product.imageUrl} width={101.94} height={93} alt="" />
              <ProductInfoContainer>
                <p>{product.name}</p>
                <span>{product.price}</span>
                <span>Quantidade: {product.quantity}</span>
                <button onClick={() => removeProductCart(product.id)}>
                  Remover
                </button>
              </ProductInfoContainer>
            </ProductContainer>
          ))}
          <ResumeContainer>
            <div>
              <span>Quantidade</span>
              <span>{quantity} Produto(s)</span>
            </div>

            <div className="price__resume">
              <span>Valor Total</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format((amount as number) / 100)}
              </span>
            </div>
            <button>Finalizar compra</button>
          </ResumeContainer>
        </ChartDrawerContainer>
      )}
    </Drawer>
  );
}
