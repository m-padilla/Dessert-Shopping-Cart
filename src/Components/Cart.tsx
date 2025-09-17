// import { getImageUrl } from "../utilities/getImageURL"
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import { getImageUrl } from "../utilities/getImageURL";
import CartItem from "./CartItem";
import data from "../data.json"


function Cart() {

    const {
        cartQuantity,
        cartItems
    } = useShoppingCart();


    return (
        <div className='p-5'>
            <div className='bg-white rounded-lg'>
                <div className="flex pt-5 px-5 font-bold text-lg text-red-400">
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
                                <CartItem name={item.name} key={item.name} />

                            ))
                        }
                        <div className="px-5 pb-5">
                            {/* Gross total */}
                            <div className="flex">
                                <p className="text-md">Order Total</p>
                                <span className="font-bold ml-auto text-lg">{formatCurrency(
                                    cartItems.reduce((total, cartItem) => {
                                        const item = data.find(i => i.name ===
                                            cartItem.name)
                                        return total + (item?.price || 0) * cartItem.quantity
                                    }, 0)
                                )}</span>
                            </div>
                            {/* little banner for the eco stuff */}
                            <div className="py-3 text-center text-xs md:text-base">
                                <div className="bg-emerald-300 p-2 rounded-md">
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
                            <button className="bg-red-500 rounded-full w-full h-full py-2 text-white">
                                Confirm Order
                            </button>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}

export default Cart