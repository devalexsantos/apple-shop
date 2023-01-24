import { useContext } from "react";
import { ShoppingCart } from "phosphor-react";
import { ShopCartContext } from "@/contexts/ShopCart";

interface ShopCartButtonProps {
  handleSetDrawerState: (state: boolean) => void;
}

export default function ShopCartButton({
  handleSetDrawerState,
}: ShopCartButtonProps) {
  const { quantity } = useContext(ShopCartContext);

  return (
    <div className="button_shop_cart">
      <button onClick={() => handleSetDrawerState(true)}>
        <ShoppingCart size={24} />
      </button>
      {quantity > 0 && (
        <div>
          <span>{quantity}</span>
        </div>
      )}
    </div>
  );
}
