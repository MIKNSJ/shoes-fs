export default function TransactionsPage({transactions}) {
    const transDivs = transactions.map((transaction, i) =>
        {
            return (
                <div key={i} className="flex">
                    <div className="flex-grow bg-slate-50 flex items-center gap-5 sm:gap-10 shadow-xl rounded p-5">
                        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10">
                            <p className="font-bold uppercase">{transaction.quantity}</p>

                            <div className="flex w-24">
                                <img src={transaction.image} alt="Shoes" />
                            </div>

                            <p className="text-xs sm:text-base font-bold uppercase">{transaction.title}</p>

                            <div className="flex items-center gap-3 sm:gap-10">
                                <p className="text-xs sm:text-base font-bold uppercase"> Price: ${transaction.price} </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className="flex-grow text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-4xl sm:text-5xl">Transactions</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-5">
                    {transDivs}
                </div>
            </div>
        </div>
    )
}
