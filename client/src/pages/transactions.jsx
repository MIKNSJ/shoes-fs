function generateItemDivs() {
    var itemDivs = [];

    for (var i = 0; i < 8; i++) {
        itemDivs.push(
            <div key={i} className="flex">
                <div className="bg-slate-50 flex items-center gap-5 sm:gap-10 shadow-xl rounded p-5">
                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
                        <p className="font-bold uppercase">1</p>

                        <div className="flex w-24">
                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                        </div>

                        <p className="text-xs sm:text-base font-bold uppercase">Air Jordans</p>

                        <div className="flex items-center gap-3 sm:gap-10">
                            <p className="text-xs sm:text-base font-bold uppercase"> Price: $100 </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return itemDivs
}



export default function TransactionsPage() {
    const response = async () => await fetch("/api/users");

    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-4xl sm:text-5xl">Transactions</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-5">
                    {generateItemDivs()}
                </div>
            </div>
        </div>
    )
}
