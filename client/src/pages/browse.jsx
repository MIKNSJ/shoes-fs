
export default function BrowsePage({items}) {
    function generateItemDivs(items) {
        var itemDivs = [];
    
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                itemDivs.push(
                    <div key={i} className="card bg-slate-50 w-52 md:w-64 xl:w-72 2xl:w-[19rem] shadow-xl">
                        <figure className="flex h-[170.06px]">
                            <img src={items[i].image} alt="Shoes" />
                        </figure>
    
                        <div className="card-body">
                            <h2 className="card-title">{items[i].title}</h2>
                            <p>{items[i].description}</p>
                            <div className="mt-5 flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center">
                                <p className="font-bold">${items[i].price}</p>
                                <div className="card-actions md:justify-end">
                                    <button className="btn btn-info">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    
        return itemDivs
    }

    return (
        <div className="text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Browse</h1>
            
            <div className="flex flex-wrap gap-10">
                {generateItemDivs(items)}
            </div>
        </div>
    )
}
