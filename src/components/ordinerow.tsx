import { cn } from "../utils/cn"
import { FormatPrice } from "../utils/formatPrice"

type OrdineProps = {
    name: string,
    quantity: number
    price: number
    onClickAdd: () => void
    onClickSub: () => void
    disabledAdd: boolean
}


export function OrdineRow({name,quantity,price,onClickAdd,onClickSub,disabledAdd}: OrdineProps){
    return <>
        <div className="flex justify-between gap-1 w-100 p-2 border border-gray-400 rounded-lg items-center">
            <p className="w-1/3 capitalize">{name}</p>
            <div className="flex gap-2 w-1/3 items-center justify-between">
                <button className="flex p-4 rounded-full bg-gray-400 size-4 justify-center items-center hover:cursor-pointer hover:opacity-80 "
                onClick={onClickSub}
                >-</button>
                <p>{quantity}</p>
                <button className={cn("flex p-4 rounded-full bg-gray-400 size-4 justify-center items-center hover:cursor-pointer hover:opacity-80",
                    {
                        "bg-red-500 hover:cursor-default hover:opacity-100" : disabledAdd,
                    }
                )}
                onClick={onClickAdd}
                disabled= {disabledAdd}
                >+</button>
            </div>

            <p className="w-1/6 text-right">{FormatPrice(quantity*price)}</p>
        </div>

    </>
}