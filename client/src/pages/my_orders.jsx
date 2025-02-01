import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";



export default function MyOrdersPage({cart}) {
    async function handleAdd(itemId) {
        const addItem = await fetch(`../api/items/${itemId}/add`);
        return;
    }

    async function handleSubtract(itemId) {
        const subItem = await fetch(`../api/items/${itemId}/subtract`);
        return;
    }

    async function handleDelete(itemId) {
        const deleteItem = await fetch(`../api/items/${itemId}/delete`);
        return;
    }

    async function handleCheckout() {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        const responseCheckout = await fetch("../api/checkout");
        const data = await responseCheckout.json();
        const result = stripe.redirectToCheckout({
            sessionId: data.sessionId,
        })
        return;
    }

    // "?" is needed after cart.items otherwise it will error.
    const itemDivs = cart.items?.map((item, i) =>
        {
            return (
                <div key={i} className="flex">
                    <div className="flex-grow bg-slate-50 flex items-center gap-5 sm:gap-10 shadow-xl rounded p-5">
                        <div className="flex flex-col items-center gap-3">
                            <button onClick={() => handleAdd(item.product_id)}>
                                <FaPlus size={30}/>
                            </button>
    
                            <p className="font-bold uppercase">{item.quantity}</p>
    
                            <button onClick={() => handleSubtract(item.product_id)}>
                                <FaMinus size={30}/>
                            </button>
                        </div>
    
                        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
                            <div className="flex w-24">
                                <img src={item.image} alt="Shoes" />
                            </div>
    
                            <p className="text-xs sm:text-base font-bold uppercase">{item.title}</p>
    
                            <div className="flex items-center gap-3 sm:gap-10">
                                <p className="text-xs sm:text-base font-bold uppercase"> Price: ${item.price * item.quantity} </p>
    
                                <button onClick={() => handleDelete(item.product_id)}>
                                    <FaRegTrashCan size={30}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-5 sm:p-10">
            <h1 className="font-bold text-4xl sm:text-5xl">My Orders</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-5">
                    {itemDivs}
                </div>

                <div className="bg-slate-50 flex flex-col gap-10 p-5 shadow-xl rounded">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Total</h1>
                        <p className="font-bold text-3xl">${cart.totalPrice}</p>
                    </div>

                    <div className="bg-slate-50 flex flex-col gap-10">
                        <h1 className="text-xl font-bold uppercase">Pay with Stripe!</h1>
                        <button className="p-2 bg-green-500 font-bold uppercase rounded" onClick={() => {handleCheckout()}}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
