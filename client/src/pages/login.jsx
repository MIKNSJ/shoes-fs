export default function LoginPage() {
    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Login</h1>

            <form action="/api/users/login" method="POST" className="w-40 sm:w-96 self-center bg-slate-200 flex flex-col gap-10 p-5 shadow-xl rounded">
                <h1 className="text-xl font-bold uppercase">Welcome back to <em>shoes</em>!</h1>
                <div className="flex flex-col gap-1">
                    <label className="font-bold uppercase">Email</label>
                    <input type="string" name="email" className="bg-white rounded p-2" autoComplete="off" required/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-bold uppercase">Password</label>
                    <input type="string" name="password" className="bg-white rounded p-2" autoComplete="off" required/>
                </div>

                <input className="p-2 bg-green-500 font-bold uppercase rounded" type="submit" value="Login"/>

                <a href="/account/create" className="self-end text-blue-500">Create an account here...</a>
            </form>
        </div>
    )
}
