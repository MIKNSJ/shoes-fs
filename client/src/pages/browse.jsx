function generateItemDivs() {
    var itemDivs = [];

    for (var i = 0; i < 8; i++) {
        itemDivs.push(
            <div key={i} className="card bg-slate-50 w-52 md:w-64 xl:w-72 2xl:w-[19rem] shadow-xl">
                <figure>
                  <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="mt-5 flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center">
                        <p className="font-bold">$100</p>
                        <div className="card-actions md:justify-end">
                            <button className="btn btn-info">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return itemDivs
}


export default function BrowsePage() {
    return (
        <div className="text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Browse</h1>
            
            <div className="flex flex-wrap items-center gap-10">
                {generateItemDivs()}
            </div>
        </div>
    )
}
