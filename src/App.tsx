import { useState } from "react"
import { menu } from "./data/menu"
import Menu from "./components/menu"
import { type Ordine } from "./components/order"
import Order from "./components/order"
import OrdiniDaRitirare from "./components/ordinidaritirare"

export type OrdineConfermato = {
  name: string,
  classe: string,
  ritiro: "ricreazione" | "pranzo",
  prodotti: Ordine[],
  totale: number,
}

function App() {

const [ordiniDaRitirare,setOrdiniDaRitirare] = useState<OrdineConfermato[]>([] as OrdineConfermato[])

const [carrello, setCarrello] = useState<Ordine[]>([])

{/*addCarrello => aggiunge un prodotto al carrello (+1 quantita || + elemento nella lista)*/}
function addCarrello(productId : number){
  if (carrello.find(ordine => ordine.productId === productId)){
    setCarrello(carrello.map(ordine => ordine.productId === productId? {...ordine, quantity: ordine.quantity + 1} : ordine))
  } else {
    setCarrello([...carrello, { productId: productId, quantity: 1}]);
  }

}

{/*subCarrello => toglie un prodotto dal carrello*/}
function subCarrello(productId : number){
  if (carrello.find(ordine => ordine.productId === productId)){
    setCarrello(carrello.map(ordine => ordine.productId === productId? {...ordine, quantity: ordine.quantity - 1} : ordine).filter(ordine => ordine.quantity > 0))
  } 

}

{/*carrelloCostSum => Calcola il costo totale del carrello cercando i prezzi dal Menu*/}
function carrelloCostSum(ordini: Array<Ordine>): number{
  return ordini.reduce((totale,ordine) => {
    const prezzo = ordineGetPrice(ordine.productId);
    return totale + (prezzo * ordine.quantity);
  },0)
}

{/*svuotaCarrello => svuota il carrello*/}
function svuotaCarrello(){
  setCarrello([])
}

{/*ordineGetName => Prende il nome cercando nel menu tramite Id*/}
function ordineGetName(OrdineProductId:number):string{
  return (menu.find(product => product.id === OrdineProductId)).name
}

{/*ordineGetPrice => Prende il prezzo cercando nel menu tramite Id*/}
function ordineGetPrice(OrdineProductId: number):number{
  return (menu.find(product => product.id === OrdineProductId)).price
}

{/*Menu disable Add => disabilita il pulsante di aggiunta prodotti (5 max)*/}
function menuDisableAdd(id: number): boolean{
  return (carrello.find(ordine => ordine.productId === id))?.quantity >= 5
}

{/*confermaOrdine => aggiunge un ordine agli ordini da ritirare*/}
function confermaOrdine(ordineConfermato:OrdineConfermato) {
  setOrdiniDaRitirare([...ordiniDaRitirare,ordineConfermato])
  console.log(ordiniDaRitirare)
}

{/*ritiraOrdine => Elimina l'ordine dagli ordiniRitirabili dopo la pressione del pulsante ritira*/}
function ritiraOrdine(ordineName: string){
setOrdiniDaRitirare(ordiniDaRitirare.filter(ordine => {ordine.name !== ordineName}))
}

{/*quantitaOrdiniARicreazione => ritorna il numero di ordini a Colazione*/}
function quantitaOrdiniARicreazione():number{
  return (ordiniDaRitirare.filter(ordine => ordine.ritiro === "ricreazione").length)
}



return <>
  <section className="flex flex-col justify-center items-center">
    <div className="flex flex-col justify-center items-center max-w-200 gap-4 shadow-2xl p-4">

      {/*MENU */}
      <Menu
      menu = {menu}
      addCarrello = {addCarrello}
      disabledAdd = {menuDisableAdd}
      />


      {/*Carrello/ Ordine Totale*/}
      <Order
      carrello={carrello}
      addCarrello={addCarrello}
      subCarrello={subCarrello}
      costSum={carrelloCostSum}
      getName={ordineGetName}
      getPrice={ordineGetPrice}
      svuotaCarrello = {svuotaCarrello}
      confermaOrdine = {confermaOrdine}
      quantitaOrdiniARicreazione = {quantitaOrdiniARicreazione}
      />
      

      {/*Ordini da Ritirare */}
      <OrdiniDaRitirare
        ordiniDaRitirare={ordiniDaRitirare}
        ordineGetName={ordineGetName}
        onClickRitira={ritiraOrdine}
      />


    </div>
  </section>
</>
}

export default App