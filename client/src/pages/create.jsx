export default function CreatePage() {
    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Create</h1>

            <form action="/api/users/create" method="post" className="w-40 sm:w-96 self-center bg-slate-200 flex flex-col gap-10 p-5 shadow-xl rounded">
                <h1 className="text-xl font-bold uppercase">Join <em>shoes</em> now!</h1>
                <div className="flex flex-col gap-1">
                    <label className="font-bold uppercase">Email</label>
                    <input type="string" name="email" className="bg-white rounded p-2" autoComplete="off" required/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-bold uppercase">Username</label>
                    <input type="string" name="username" className="bg-white rounded p-2" autoComplete="off" required/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-bold uppercase">Password</label>
                    <input type="string" name="password" className="bg-white rounded p-2" autoComplete="off" required/>
                </div>

                <input className="p-2 bg-blue-500 font-bold uppercase rounded" type="submit" value="Create"/>

                <a href="/account/login" className="self-end text-blue-500">Login to your account here...</a>
            </form>
        </div>
    )
}
