export default function BrowsePage({items}) {
    async function handleAdd(itemId) {
        const addItem = await fetch(`./api/items/${itemId}/add`);
    }

    const itemDivs = items.map((item, i) =>
        {
            return (
                <div key={i} className="card bg-slate-50 w-52 md:w-64 xl:w-72 2xl:w-[19rem] shadow-xl">
                    <figure className="flex h-[170.06px]">
                        <img src={item.image} alt="Shoes" />
                    </figure>
    
                    <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="mt-5 flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center">
                            <p className="font-bold">${item.price}</p>
                            <div className="card-actions md:justify-end">
                                <button onClick={() => handleAdd(item.id)} className="btn btn-info">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className="text-black flex flex-col gap-20 p-10">
            <h1 className="font-bold text-5xl">Browse</h1>
            
            <div className="flex flex-wrap gap-10">
                {itemDivs}
            </div>
        </div>
    )
}
