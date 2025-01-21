import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";



function generateItemDivs() {
    var itemDivs = [];

    for (var i = 0; i < 8; i++) {
        itemDivs.push(
            <div key={i} className="flex">
                <div className="bg-slate-50 flex items-center gap-5 sm:gap-10 shadow-xl rounded p-5">
                    <div className="flex flex-col items-center gap-3">
                        <button>
                            <FaPlus size={30}/>
                        </button>

                        <p className="font-bold uppercase">1</p>

                        <button>
                            <FaMinus size={30}/>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
                        <div className="flex w-24">
                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                        </div>

                        <p className="text-xs sm:text-base font-bold uppercase">Air Jordans</p>

                        <div className="flex items-center gap-3 sm:gap-10">
                            <p className="text-xs sm:text-base font-bold uppercase"> Price: $100 </p>

                            <button>
                                <FaRegTrashCan size={30}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return itemDivs
}


export default function MyOrdersPage() {
    const [totalPrice, setTotalPrice] = useState(100)


    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-4xl sm:text-5xl">My Orders</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-5">
                    {generateItemDivs()}
                </div>

                <div className="bg-slate-50 flex flex-col gap-10 p-5 shadow-xl rounded">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-3xl">Total</h1>
                        <p className="font-bold text-3xl">${totalPrice}</p>
                    </div>

                    <form className="bg-slate-50 flex flex-col gap-10">
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
