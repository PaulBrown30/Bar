import { FormatPrice } from "../utils/formatPrice"
import type { Ordine } from "./order"

type OrdiniDaRitirareProps = {
    ordiniDaRitirare: OrdineConfermato[],
    ordineGetName: (id:number) => string,
    onClickRitira: (ordineName: string) => void,
}

export type OrdineConfermato = {
  name: string,
  classe: string,
  ritiro: "ricreazione" | "pranzo",
  prodotti: Ordine[],
  totale: number,
}

const OrdiniDaRitirare = ({ordiniDaRitirare,ordineGetName,onClickRitira}: OrdiniDaRitirareProps) => {
  return (

        <div className="border-t-2 flex flex-col w-full p-2 gap-2">
            <p
            className="font-bold text-2xl"
            >ORDINI DA RITIRARE</p>
            {ordiniDaRitirare.map(ordineRitirabile => 
                <div
                    className="border rounded-lg"
                    key={ordineRitirabile.name}
                >
                    <div
                    className = "flex flex-row gap-2 p-2 justify-around"
                    > 
                    <p>{ordineRitirabile.name}</p>
                    <p>{ordineRitirabile.classe}</p>
                    <p>{ordineRitirabile.ritiro}</p>
                    <p>{FormatPrice(ordineRitirabile.totale)}</p>
                    </div>

                    <div
                        className="flex flex-col p-2 "
                    >
                        {ordineRitirabile.prodotti.map(ordine => 
                        <div
                        className="flex flex-row gap-2 justify-between px-4"
                        key={ordine.productId}
                        >
                            <p>{"Prodotto: " + ordineGetName(ordine.productId)}</p>
                            <p>{"Quantita: " + ordine.quantity}</p>
                        </div>
                        )}
                        <button 
                        className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:cursor-pointer hover:opacity-80"
                        onClick={() =>onClickRitira(ordineRitirabile.name)}
                        >
                        RITIRATO
                        </button>
                    </div>
                </div>
            )}
        </div>
  )
}

export default OrdiniDaRitirare