export function getImageUrl(path: string){
    console.log('https://dessert-shopping-cart.onrender.com' + path)
    return new URL('https://dessert-shopping-cart.onrender.com' + path, import.meta.url).href;
}