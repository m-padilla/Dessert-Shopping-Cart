import React, { createContext, useContext, useState } from "react";

type CartItem ={
    name: string,
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (name: string) => number,
    increaseQuantity: (name: string) => void,
    decreaseQuantity: (name: string) => void,
    removeFromCart: (name: string) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    
    function getItemQuantity (name: string){
        return cartItems.find((item) => item.name === name)?.quantity || 0
        
    }

    function increaseQuantity (name: string){
        setCartItems(currItems => {
            if(currItems.find(item => item.name === name) == null){
                return [...currItems, {name, quantity: 1}]
            }else{
                return currItems.map(item => {
                    if(item.name == name){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }

        })
    }

    function decreaseQuantity (name: string){
        setCartItems(currItems => {
            if(currItems.find(item => item.name === name)?.quantity === 1){
                return currItems.filter(item => item.name !== name)
            }else{
                return currItems.map(item => {
                    if(item.name == name){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }

        })
    }

    function removeFromCart (name: string){
        setCartItems(currItems => {
            return currItems.filter(item => item.name !== name)
        })

    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

      
    

    return (
        <ShoppingCartContext.Provider value={{
                getItemQuantity,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                cartQuantity,
                cartItems
        }}>
            {children}
        </ShoppingCartContext.Provider>

    )

}