import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { FiX } from "react-icons/fi";
import formatCurrency from "../utilities/formatCurrency";
import useFetch from "../services/useFetch.ts";
import { getDesserts } from "../services/api.ts";
import type { Dessert } from "../interfaces/Dessersts.interfaces.tsx";

function CartItem({ id }: { id: number }) {

    const {
        getItemQuantity,
        removeFromCart
    } = useShoppingCart();

    const { data: dessert,
        loading: dessertsLoading,
        error: dessertError
    } = useFetch<Dessert>(() => getDesserts({
        query: String(id)
    }));

        return (
            dessertsLoading ? (
                <div>Loading...</div>
            ) : dessertError ? (
                <div>{dessertError?.message}</div>
            ) : dessert &&  (
                <div className="flex">
                    <div className="py-5 ">
                        {/* Name of dessert */}
                        <p className="pl-5 font-bold">{dessert.name}</p>
                        <div className="flex">
                            {/* quantity */}
                            <p className="pl-5 text-red font-semibold">{getItemQuantity(dessert._id)}x</p>
                            <p className="pl-3 text-sm  text-rose-400 align-text-bottom">@</p>
                            {/* price */}
                            <p className="pl-1 text-rose-400">{formatCurrency(dessert.price)}</p>
                            {/* total cost */}
                            <p className="pl-2 text-rose-400 font-semibold">
                                {formatCurrency(getItemQuantity(dessert._id) * dessert.price)}
                            </p>
                        </div>
                    </div>
                    <div className="pr-5 ml-auto flex justify-start items-center">
                        <button
                            className="border-2 border-slate-500 text-slate-500 hover:text-black hover:border-black rounded-full"
                            onClick={() => removeFromCart(dessert._id)}
                        >
                            <FiX className="text-md" />
                        </button>
                    </div>
                </div>
                )
            );
    }
    
    export default CartItem;