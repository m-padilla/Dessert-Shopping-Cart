import { getImageUrl } from "../utilities/getImageURL"
import { FiMinus, FiPlus } from "react-icons/fi";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import formatCurrency from "../utilities/formatCurrency";
import type { Dessert } from "../interfaces/Dessersts.interfaces.tsx";

export type DessertProps = {
    dessert: Dessert
}



function DessertCard({ dessert }: DessertProps) {

    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
    } = useShoppingCart();

    const quantity = getItemQuantity(dessert._id)

    const isMobile = window.matchMedia("(max-width: 375px)").matches;

    return (
        <div className="p-3">
            {/* image and button */}
            <div className="relative">
                <img
                    src={dessert.images &&
                        isMobile 
                        ? getImageUrl(dessert.images.mobile)
                        : dessert.images.desktop
                    }
                    alt={dessert.name}
                    className={quantity == 0
                        ? "w-full h-52 rounded-lg text-white object-cover"
                        : "w-full h-52 rounded-lg object-cover border-2 border-red"
                    }
                />

                {/* add to cart button */}

                {
                    quantity == 0
                        ? <button
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white md:w-[150px] p-2 rounded-full border-2 border-red"
                            onClick={() => increaseQuantity(dessert._id)}>
                            <div className="flex justify-center items-center text-xs px-2">
                                <img src={getImageUrl('/images/icon-add-to-cart.svg')} className="text-xs" />
                                <p className="pl-2 flex-nowrap text-rose-900 font-semibold">Add to Cart</p>
                            </div>
                        </button>
                        : <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-red w-[150px] max-h-10 p-2 rounded-full border-2 border-red">
                            <div className="flex justify-between items-center px-2">
                                <button className="border-2 border-white rounded-full"
                                    onClick={() => decreaseQuantity(dessert._id)}>
                                    <FiMinus className="text-md text-white hover:text-red hover:bg-white rounded-full" />
                                </button>

                                <p className=" text-md flex-nowrap text-white font-semibold ">{quantity}</p>

                                <button className="border-2 border-white rounded-full"
                                    onClick={() => increaseQuantity(dessert._id)}>
                                    <FiPlus className="text-md text-white hover:text-red hover:bg-white rounded-full" />
                                </button>
                            </div>
                        </div>
                }

            </div>


            {/* text info of desserts */}
            <div className="py-7">
                <p className="text-rose-400 text-sm">
                    {dessert.category}
                </p>
                <p className="text-base text-rose-900 font-semibold">
                    {dessert.name}
                </p>
                <p className="text-red font-bold">
                    {formatCurrency(dessert.price)}
                </p>
            </div>
        </div>
    )
}

export default DessertCard