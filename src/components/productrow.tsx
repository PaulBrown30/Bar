import { type Product } from "../data/menu.ts";
import { cn } from "../utils/cn.ts";
import { FormatPrice } from "../utils/formatPrice.ts";

type ProductRowProps = {
    product : Product,
    onClick?: () => void,
    disabledAdd: boolean,
}

export function ProductRow({product,onClick,disabledAdd} : ProductRowProps){
    return <>
        <div className = "flex  gap-2 justify-between w-100 bg-white p-2 px-4 border border-gray-500 rounded-lg">
            <div className="flex flex-col">
                <p className="font-bold capitalize">{product.name}</p>
                <p >{FormatPrice(product.price)}</p>
            </div>

            <button 
            className = {cn("py-2 px-4 rounded-4xl bg-blue-400 shadow-lg hover:cursor-pointer hover:opacity-80 text-white",
                {
                    "bg-red-400 hover:cursor-default hover:opacity-100": disabledAdd
                }
            )}
            onClick={onClick}
            disabled = {disabledAdd}
            >
                Aggiungi
                
            </button>
        </div>
    </>
}