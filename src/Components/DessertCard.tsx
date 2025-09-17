import { getImageUrl } from "../utilities/getImageURL"
import { FiMinus, FiPlus } from "react-icons/fi";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";

export type DessertProps = {
    dessert: {
        image: {
            desktop: string,
            mobile: string,
            thumbnail: string
        }
        price: number,
        name: string,
        category: string
    }

}



function DessertCard({ dessert }: DessertProps) {

    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
    } = useShoppingCart();

    const quantity = getItemQuantity(dessert.name)

    return (
        <div className="p-3">
            {/* image and button */}
            <div className="relative">
                <img
                    src={getImageUrl(dessert.image.desktop)}
                    alt={dessert.name}
                    className={ quantity == 0 
                        ? "w-full h-52 rounded-lg text-white object-cover"
                        : "w-full h-52 rounded-lg object-cover border-2 border-red-500"
                    }
                />

                {/* add to cart button */}

                {
                    quantity == 0
                        ? <button
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white md:w-[150px] p-2 rounded-full border-2 border-red-500"
                            onClick={() => increaseQuantity(dessert.name)}>
                            <div className="flex justify-center items-center text-xs px-2">
                                <img src={getImageUrl('/src/assets/images/icon-add-to-cart.svg')} className="text-xs" />
                                <p className="pl-2 flex-nowrap text-red-500 font-semibold">Add to Cart</p>
                            </div>
                        </button>
                        : <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-red-500 w-[150px] max-h-10 p-2 rounded-full border-2 border-red-500">
                            <div className="flex justify-between items-center px-2">
                                <button className="border-2 border-white rounded-full"
                                    onClick={() => decreaseQuantity(dessert.name)}>
                                    <FiMinus className="text-md text-white hover:text-red-500 hover:bg-white rounded-full" />
                                </button>

                                <p className=" text-md flex-nowrap text-white font-semibold ">{ quantity }</p>

                                <button className="border-2 border-white rounded-full"
                                    onClick={() => increaseQuantity(dessert.name)}>
                                    <FiPlus className="text-md text-white hover:text-red-500 hover:bg-white rounded-full" />
                                </button>
                            </div>
                        </div>
                }

            </div>


            {/* text info of desserts */}
            <div className="py-7 text-sm">
                <p className="text-brown">
                    {dessert.category}
                </p>
                <p className="text-white">
                    {dessert.name}
                </p>
                <p className="text-red-400">
                    {formatCurrency(dessert.price)}
                </p>
            </div>
        </div>
    )
}

export default DessertCard