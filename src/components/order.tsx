import { OrdineRow } from "./ordinerow"
import Checkoutform from "./checkoutform"
import type { OrdineConfermato } from "../App"

export type Ordine = {
  productId: number,
  quantity: number,
}

type OrderProps = {
    carrello: Ordine[],
    addCarrello: (id:number) => void,
    subCarrello: (id:number) => void,
    costSum: (carrello: Ordine[]) => number,
    getName: (id:number) => string,
    getPrice: (id:number) => number,
    svuotaCarrello: () => void
    confermaOrdine: (ordineConfermato: OrdineConfermato) => void
    quantitaOrdiniARicreazione: () => number
}


const Order = ({carrello,addCarrello,subCarrello,costSum,getName,getPrice,svuotaCarrello,confermaOrdine,quantitaOrdiniARicreazione} : OrderProps) => {



  return (
      <div className="flex flex-col w-full justify-center">
            <div className="flex flex-col gap-2 w-full justify-center p-4">

                {/*Riepilogo prodotti*/}
                <p className="font-bold text-xl">Ordine Totale</p>
                {carrello.map(ordine => <OrdineRow
                key={ordine.productId}
                name = {getName(ordine.productId)}
                quantity = {ordine.quantity}
                price = {getPrice(ordine.productId)}
                onClickAdd = {() => {addCarrello(ordine.productId)}}
                onClickSub = {() => {subCarrello(ordine.productId)}}
                disabledAdd = {ordine.quantity >= 5}
                />)}
        
                {/*Form  */}
                 <Checkoutform
                    carrello={carrello}
                    costSum={costSum}
                    svuotaCarrello={svuotaCarrello}
                    confermaOrdine = {confermaOrdine}
                    quantitaOrdiniARicreazione = {quantitaOrdiniARicreazione}                 
                  />

            </div>
          </div>
  )
}

export default Order