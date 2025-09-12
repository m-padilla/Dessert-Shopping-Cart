

type DessertCardProps = {
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

const getImageUrl = (path: string) => new URL(path, import.meta.url).href;

function DessertCard({ dessert }: DessertCardProps) {

    return (
        <div className="px-5">
            {/* image and button */}
            <div className="relative">
                <img
                    src={getImageUrl(dessert.image.desktop)}
                    alt={dessert.name}
                    className="w-full h-60 rounded-lg text-white object-cover"
                />

                <button className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border-2 border-">
                    <div className="flex flex-nowrap text-sm px-2">
                    <img src={getImageUrl('/src/assets/images/icon-add-to-cart.svg')}/>
                    <p className="pl-2 ">Add to Cart</p>

                    </div>
                </button>

            </div>


            {/* text info of desserts */}
            <div className="pt-7">
                <p className="text-brown">
                    {dessert.category}
                </p>
                <p className="text-white">
                    {dessert.name}
                </p>
                <p className="text-red-400">
                    ${dessert.price}
                </p>
            </div>
        </div>
    )
}

export default DessertCard