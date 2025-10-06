import { getImageUrl } from "../utilities/getImageURL"
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import DialogModal from "./DialogModal";
import type { Dessert } from "../interfaces/Dessersts.interfaces.tsx";
import { getDesserts } from "../services/api.ts";
import useFetch from "../services/useFetch.ts";


function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        cartQuantity,
        cartItems
    } = useShoppingCart();

    const {
        data: desserts,
        loading,
        error
    } = useFetch<Dessert[]>(() => getDesserts({
        query: ''
    }))

    return (
        <>
            {
                loading ? <div>Loading...</div>
                    : error ? <div>Error: {error.message}</div>
                        : (
                            <>
                                <DialogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                <div className='p-5 sticky'>
                                    <div className='bg-white rounded-lg'>
                                        <div className="flex pt-5 px-5 font-bold text-lg text-red">
                                            <p>Your Cart</p>
                                            <p className="pl-1">({cartQuantity})</p>
                                        </div>

                                        {cartQuantity == 0
                                            ? <div className="flex flex-col justify-center items-center py-5">
                                                <img
                                                    src={getImageUrl('/src/assets/images/illustration-empty-cart.svg')}
                                                    className="h-full aspect-square object-cover" />
                                                <span className="text-sm">Your added items will appear here</span>
                                            </div> : <>
                                                {
                                                    cartItems.map(item => (
                                                        <CartItem id={item.id} key={item.id} />
                                                    ))
                                                }
                                                <div className="px-5 pb-5">
                                                    {/* Gross total */}
                                                    <div className="flex">
                                                        <p className="text-md">Order Total</p>
                                                        <span className="font-bold ml-auto text-lg">
                                                            {
                                                                formatCurrency(
                                                                    cartItems.reduce((total, cartItem) => {
                                                                        const item = desserts && desserts.find(dessert => dessert._id === cartItem.id) 
                                                                        return total + (item && item.price || 0) * cartItem.quantity;
                                                                    }, 0)
                                                                )

                                                            }
                                                        </span>
                                                    </div>
                                                    {/* little banner for the eco stuff */}
                                                    <div className="py-3 text-center text-xs md:text-base">
                                                        <div className="bg-rose-50 p-2 rounded-md">
                                                            <div className="flex justify-center items-center">
                                                                <img
                                                                    src={getImageUrl('/src/assets/images/icon-carbon-neutral.svg')}
                                                                    className="h-full aspect-square object-cover" />
                                                                <p className="pl-2">
                                                                    This is a
                                                                </p>
                                                                <p className="font-bold px-1">
                                                                    carbon-neutral
                                                                </p>
                                                                <p>
                                                                    delivery
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {/* Confirm Order button */}
                                                    <button
                                                        onClick={() => { setIsModalOpen(true) }}
                                                        className="bg-red rounded-full w-full h-full py-2 text-white">
                                                        Confirm Order
                                                    </button>
                                                </div>
                                            </>
                                        }
                                    </div>

                                </div>
                            </>)}
        </>

    )
}

export default Cart;