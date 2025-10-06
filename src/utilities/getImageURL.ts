export function getImageUrl(path: string){
    return new URL('https://dessert-shopping-cart.onrender.com' + path, import.meta.url).href;
}