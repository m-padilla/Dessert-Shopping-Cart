import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import data from "../data.json";
import { FiX } from "react-icons/fi";
import formatCurrency from "../utilities/formatCurrency";

function CartItem({ name }: { name: string }) {

    const {
        getItemQuantity,
        removeFromCart } = useShoppingCart();
    const item = data.find(item => item.name === name)
    if (item == null) return null;


    return (
        <div className="flex">
            <div className="py-5 ">
                {/* Name of dessert */}

                <p className="pl-5 font-bold">{item.name}</p>
                <div className="flex">
                    {/* quantity */}
                    <p className="pl-5 text-red font-semibold">{getItemQuantity(item.name)}x</p>
                    <p className="pl-3 text-sm  text-rose-400 align-text-bottom">@</p>
                    {/* price  */}
                    <p className="pl-1 text-rose-400">{formatCurrency(item.price)}</p>
                    {/* total cost */}
                    <p className="pl-2 text-rose-400 font-semibold">{formatCurrency(getItemQuantity(item.name) * item.price)}</p>
                </div>

            </div>

            <div className="pr-5 ml-auto flex justify-start items-center">
                <button className="border-2 border-slate-500 text-slate-500 hover:text-black hover:border-black rounded-full"
                    onClick={() => removeFromCart(item.name)}>
                    <FiX className="text-md" />
                </button>
            </div>

        </div>
    )
}

export default CartItem