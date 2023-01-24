import { useState, useEffect, createContext } from "react";

interface ShopCartContextProps {
  products: ProductType[] | [];
  amount: number;
  quantity: number;
  removeProductCart: (id: string) => void;
  addProductCart: (
    id: string,
    price: string,
    name: string,
    imageUrl: string,
    priceUnit: number
  ) => void;
}

export interface ProductType {
  id: string;
  price: string;
  quantity: number;
  name: string;
  imageUrl: string;
  priceUnit: number;
}

export const ShopCartContext = createContext({} as ShopCartContextProps);

export function ShopCartProvider({ children }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let totalAmount = products.reduce(
      (total, item) => (total += item.quantity * item.priceUnit),
      0
    );
    setAmount(totalAmount);

    let totalQuantity = products.reduce(
      (total, item) => (total += item.quantity),
      0
    );
    setQuantity(totalQuantity);
  }, [products]);

  function addProductCart(
    id: string,
    price: string,
    name: string,
    imageUrl: string,
    priceUnit: number
  ) {
    const newCartList = [...products];

    const findProduct = newCartList.find((product) => product.id === id);

    if (findProduct) {
      findProduct.quantity++;
    } else {
      newCartList.push({
        id: id,
        price: price,
        quantity: 1,
        name: name,
        imageUrl: imageUrl,
        priceUnit: priceUnit,
      });
    }

    setProducts(newCartList);

    console.log(products);
  }

  function removeProductCart(id: string) {
    const newProductList = [...products];

    const findProduct = newProductList.find((product) => product.id === id);

    if (findProduct) {
      if (findProduct.quantity === 1) {
        const indexProduct = newProductList.indexOf(findProduct);
        newProductList.splice(indexProduct, 1);
      } else {
        findProduct.quantity--;
      }
    }
    setProducts(newProductList);
  }

  return (
    <ShopCartContext.Provider
      value={{ products, amount, quantity, addProductCart, removeProductCart }}
    >
      {children}
    </ShopCartContext.Provider>
  );
}
