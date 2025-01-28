import { useNavigate } from "react-router";



export default function LogoutPage() {
    const navigate = useNavigate();

    async function handleSignOut() {
        const response = await fetch("/api/users/logout");
        navigate("/");
        navigate(0);
    };
    
    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Logout</h1>

            <div className="w-40 sm:w-96 self-center flex flex-col gap-10 p-5 bg-slate-200 shadow-xl rounded">
                <h1 className="font-bold uppercase text-xl md:text-3xl">Are you sure you want to logout?</h1>

                <div className="flex justify-between items-center">
                    <button onClick={handleSignOut} className="bg-red-500 px-3 py-2 rounded font-bold uppercase">Yes</button>
                    <a href="/" className="bg-green-500 px-3 py-2 rounded font-bold uppercase">No</a>
                </div>
            </div>
        </div>
    )
}
