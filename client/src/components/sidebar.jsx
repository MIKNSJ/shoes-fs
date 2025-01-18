import { RxDashboard } from "react-icons/rx";
import { RiShoppingBasketLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import { CgArrowsShrinkH } from "react-icons/cg";



export default function Sidebar() {
    return (
        <div className="w-[20rem] min-h-screen bg-neutral-800 text-white flex flex-col justify-between p-10">
            <div className="flex flex-col">
                <CgArrowsShrinkH className="self-end duration-500 hover:bg-neutral-700 p-2 rounded" size={38}/>
                <h1 className="font-segoe text-6xl">shoes</h1>
            </div>

            <div className="font-liber text-2xl flex flex-col gap-5">
                <a href="#" className="flex items-center gap-2 duration-500 hover:bg-neutral-700 p-2 rounded">
                    <RxDashboard size={30}/>
                    <h1>Browse</h1>
                </a>
                <a href="#" className="flex items-center gap-2 duration-500 hover:bg-neutral-700 p-2 rounded">
                    <RiShoppingBasketLine size={30}/>
                    <h1>My Orders</h1>
                </a>
            </div>

            <a href="#" className="font-liber text-2xl flex items-center gap-2 duration-500 hover:bg-neutral-700 p-2 rounded">
                <LuLogIn size={30}/>
                <h1>Log In</h1>
            </a>
        </div>
    )
}
