import { RxDashboard } from "react-icons/rx";
import { RiShoppingBasketLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import { CgArrowsShrinkH } from "react-icons/cg";
import { TbShoe } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import MyOrders from "../pages/my_orders.jsx"



export default function Sidebar({authState}) {
    const [navStatus, setNavStatus] = useState(true);
    const [numItems, setNumItems] = useState(5);

    const toggleNav = () => {
        setNavStatus(!navStatus);
    }

    function toggleLoginStatus() {
        const divList = [];
    
        if (authState === null) {
            divList.push(
                <a key={0} href="/account/login" className="font-liber text-2xl flex items-center gap-5 duration-500 hover:bg-neutral-700 p-2 rounded">
                    <span><LuLogIn size={30}/></span>
                    {navStatus ? <h1 className="hidden lg:block whitespace-nowrap">Log In</h1> : null}
                </a>
            );
        } else {
            divList.push(
                <a key={0} href="/account/logout" className="font-liber text-2xl flex items-center gap-5 duration-500 hover:bg-neutral-700 p-2 rounded">
                    <span><LuLogIn size={30} className="rotate-180"/></span>
                    {navStatus ? <h1 className="hidden lg:block whitespace-nowrap">Log Out</h1> : null}
                </a>
            );
        }
    
        return divList;
    }

    return (
        <div className={navStatus ? "flex-shrink-0 w-[5rem] lg:w-[20rem] min-h-screen bg-neutral-800 text-white transition-[width] ease-in-out duration-500" : "flex-shrink-0 w-[5rem] min-h-screen bg-neutral-800 text-white transition-[width] ease-in-out duration-500"}>
            <div className={navStatus ? "sticky top-0 min-h-screen flex flex-col justify-between items-center lg:items-stretch px-7 py-2" : "sticky top-0 min-h-screen flex flex-col justify-between items-center p-2"}>
                <div className="flex flex-col items-center gap-3">
                    <CgArrowsShrinkH onClick={toggleNav} className="hidden lg:block self-end duration-500 hover:bg-neutral-700 p-2 rounded" size={38}/>
                    {navStatus ? <h1 className="hidden lg:block self-start font-segoe text-6xl">shoes</h1> : <TbShoe className="hidden lg:block" size={30}/>}
                    <TbShoe className="lg:hidden" size={30}/>
                </div>

                <div className="font-liber text-2xl flex flex-col gap-5">
                    <a href="/" className="flex items-center gap-5 duration-500 hover:bg-neutral-700 p-2 rounded">
                        <span><RxDashboard size={30}/></span>
                        {navStatus ? <h1 className="hidden lg:block whitespace-nowrap">Browse</h1> : null}
                    </a>

                    <a href="/account/orders" className="flex items-center gap-5 duration-500 hover:bg-neutral-700 p-2 rounded">
                        <span className="relative">
                            <RiShoppingBasketLine size={30}/>
                            <p className="absolute -top-3 left-5 text-sm rounded font-bold bg-red-500 px-2 py-1">{numItems}</p>
                        </span>
                        {navStatus ? <h1 className="hidden lg:block whitespace-nowrap">My Orders</h1> : null}
                    </a>

                    <a href="/account/transactions" className="flex items-center gap-5 duration-500 hover:bg-neutral-700 p-2 rounded">
                        <span><IoWalletOutline size={30}/></span>
                        {navStatus ? <h1 className="hidden lg:block whitespace-nowrap">Transactions</h1> : null}
                    </a>
                </div>

                {toggleLoginStatus()}
            </div>
        </div>
    )
}
