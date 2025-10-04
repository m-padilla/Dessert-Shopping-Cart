import { useRef, useEffect } from "react";
import type { Dessert } from "../interfaces/Dessersts.interfaces.tsx";
import useFetch from "../services/useFetch";
import { getDesserts } from "../services/api.ts";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import formatCurrency from "../utilities/formatCurrency";
import { getImageUrl } from "../utilities/getImageURL";

function OrderedItem({ id }: { id: string }) {

  const { getItemQuantity } = useShoppingCart()

  const {
    data: desserts,
    loading: dessertsLoading,
    error: dessertError
  } = useFetch<Dessert>(() => getDesserts({
    query: `${id}`

  }))

  const item = desserts;

  return (
    <>
      {
        dessertsLoading ? <div>Loading...</div>
          : dessertError ? <div>{dessertError.message}</div>
            : (item &&

              <div className="flex pb-5">
                {/* Thumbnail */}
                <img
                  className="rounded-lg max-w-14 aspect-square"
                  src={getImageUrl(item.images.thumbnail)}
                  alt={item.name}
                />

                {/* Middle content (flex-1 makes it grow/shrink) */}
                <div className=" pl-5 text-xs md:text-base flex flex-col justify-between flex-1 min-w-0">
                  <p className="pl-1 font-bold truncate">{item.name}</p>

                  <div className="flex items-center pl-1 pb-0 ">
                    <p className="text-red font-semibold">{getItemQuantity(item._id)}x</p>
                    <p className="pl-5 text-sm text-slate-500">@</p>
                    <p className="text-slate-500">{formatCurrency(item.price)}</p>
                  </div>
                </div>

                {/* Total cost (fixed) */}
                <div className="ml-auto flex items-center">
                  <p className="text-xs md:text-base font-bold">
                    {formatCurrency(getItemQuantity(item._id) * item.price)}
                  </p>
                </div>
              </div>

            )}
    </>

  )
}

function DialogModal({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) {

  const { cartItems,
    removeFromCart
  } = useShoppingCart()

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync `isOpen` prop with the <dialog> element
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Ensure `onClose` runs when user closes via ESC or clicking backdrop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      // empty out order to start new order.
      cartItems.map((item) => {
        removeFromCart(item.id)
      })
      onClose();

    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

    function dessertPrice(id: number) {
        const {
            data: dessert,
            loading: loadingDessert,
            error: errorDessert,
        } = useFetch<Dessert>(() => getDesserts({
            query: String(id)
        }))

        if (loadingDessert || errorDessert || !dessert) return 0;

        return dessert?.price;
    }

  return (
    <dialog
      ref={dialogRef}
      className="w-full md:w-[500px] max-w-md
        p-8 
        backdrop:bg-black/50
        rounded-t-2xl md:rounded-lg

        /* override dialog defaults */
        md:m-auto
        m-0
        md:translate-x-0 md:translate-y-0
        fixed bottom-0
        transform-none"
    >
      <div className="pb-8">

        <img
          className="py-4"
          src={getImageUrl("/src/assets/images/icon-order-confirmed.svg")} />

        <p className="font-bold text-4xl">Order Confirmed</p>
        <p className="text-sm text-slate-400">We hope you enjoy your food!</p>
      </div>

      <div className="bg-amber-50 p-3 rounded-lg">
        {cartItems.map((item) => (
          <OrderedItem id={String(item.id)} key={item.id} />
        ))}

        {/* Gross total */}
        <div className="flex pt-3">
          <p className="text-sm">Order Total</p>
          <span className="font-bold ml-auto text-2xl">{formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const price = dessertPrice(cartItem.id);
              return total + (price || 0) * cartItem.quantity
            }, 0)
          )}</span>
        </div>
      </div>

      <div
        className="pt-5">
        <button
          onClick={() => onClose()}
          className="bg-red rounded-full w-full h-full py-2 text-white">
          Start New Order
        </button>

      </div>

    </dialog >
  );
}

export default DialogModal