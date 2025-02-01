import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
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

                    <form action="/api/users/items/checkout" method="POST" className="bg-slate-50 flex flex-col gap-10">
                        <h1 className="text-xl font-bold uppercase">Pay with card!</h1>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold uppercase">Card Number</label>
                            <input type="string" name="card_number" className="bg-white rounded p-2" placeholder="4242424242424242" autoComplete="off" required/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-bold uppercase">Security Code</label>
                            <input type="string" name="card_cvc" className="bg-white rounded p-2" placeholder="CVC" autoComplete="off" required/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-bold uppercase">Expire Date</label>
                            <input type="string" name="card_expire_date" className="bg-white rounded p-2" placeholder="MM/YY" autoComplete="off" required/>
                        </div>


                        <input className="p-2 bg-green-500 font-bold uppercase rounded" type="submit" value="Checkout"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
