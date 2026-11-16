import React, { useState } from "react"
import { FormatPrice } from "../utils/formatPrice"
import { type Ordine } from "./order"
import { cn } from "../utils/cn"
import ErrorMessage from "./errormessage"
import { type OrdineConfermato } from "../App"

export type Checkout = {
    carrello: Ordine[]
    costSum: (carrello: Ordine[]) => number,
    svuotaCarrello: () => void,
    confermaOrdine: (ordineConfermato: OrdineConfermato) => void
    quantitaOrdiniARicreazione: () => number
}

type OrderData = {
    values: {
        name: string,
        classe: string, 
        codiceSconto: string
        ritiro: "ricreazione" | "pranzo",
        pagamento: "contanti" | "carta",
        note: string,
    },
    errors: {
        name: string[],
        classe: string[],
        codiceSconto: string[]
        carrello: string[],
        ritiro: string[],
        pagamento: string[],
        note: string[],
    }
}



const Checkoutform = ({carrello,costSum,svuotaCarrello,confermaOrdine,quantitaOrdiniARicreazione}:Checkout) => {




    const defaultOrderState: OrderData = {
        values: {
            name: "",
            classe: "",
            codiceSconto: "",
            ritiro: "ricreazione",
            pagamento: "contanti",
            note: "",
        },
        errors: {
            name: [] as string[],
            classe: [] as string[],
            codiceSconto: [] as string[],
            carrello: [] as string[],
            ritiro: [] as string[],
            pagamento: [] as string[],
            note: [] as string[],
        }

    }

  const [orderData,setOrderData]= useState<OrderData>(defaultOrderState)

  function confirmOrder(e:React.SubmitEvent<HTMLFormElement>){

      e.preventDefault();
      let hasErrors = false;
      let newErrors = {...defaultOrderState.errors};


      {/*Errori del nome */}
      if(!orderData.values.name){
        newErrors = {...newErrors, name: [...newErrors.name, "Nome Obbligatorio!"] }
        hasErrors = true;
      }

      if(orderData.values.name.length < 2){
        newErrors = {...newErrors, name: [...newErrors.name, "Nome con almeno 2 caratteri!"] }
        hasErrors = true;
      }

      if(orderData.values.name.match(/[0-9]/)){
        newErrors = {...newErrors, name: [...newErrors.name, "Nome non puo contenere numeri!"] }
        hasErrors = true;
      }

      
      {/*Errori della classe */}
      if(!orderData.values.classe){
        newErrors = {...newErrors, classe: [...newErrors.classe, "Classe Obbligatoria!"] }
        hasErrors = true;
      }

      if(!(/^[1-5][A-Z]$/.test(orderData.values.classe))){
        newErrors = {...newErrors, classe: [...newErrors.classe, "Classe con un numero e una lettera maiuscola!"] }
        hasErrors = true;
      }

      {/*Errori del Codice Sconto */}

      if(orderData.values.codiceSconto && orderData.values.codiceSconto.toLowerCase() !== "bar10"){
        newErrors = {...newErrors, codiceSconto: [...newErrors.codiceSconto, "Codice sconto non valido!"] }
        hasErrors = true;
      }


      {/*Errori del ritiro */}
      if(orderData.values.ritiro == "ricreazione" && quantitaOrdiniARicreazione() >= 3){
        newErrors = {...newErrors, ritiro: [...newErrors.ritiro, "Max Numero ritiri a ricreazione raggiunto!"] }
        hasErrors = true;
      }


      {/*Errori del pagamento */}
      if(orderData.values.pagamento === "carta" && applicaSconto(costSum(carrello)) < 3){
        newErrors = {...newErrors, pagamento: [...newErrors.pagamento, "L'ordine con carta deve costare minimo 3 dollari!"] }
        hasErrors = true;
      }


      {/*Errori delle note */}
      if(orderData.values.note && orderData.values.note.length > 100){
        newErrors = {...newErrors, note: [...newErrors.note, "Le note non possono superare 100 caratteri!"] }
        hasErrors = true;
      }

      if(!carrello || carrello.length === 0){
        newErrors = {...newErrors, carrello: [...newErrors.carrello, "Carrello vuoto!"] }
        hasErrors = true;
      }

      if(hasErrors){
          setOrderData({...orderData, errors: {...newErrors }})
          return
      }

      console.log(orderData)

      confermaOrdine({
        name: orderData.values.name,
        classe: orderData.values.classe,
        ritiro: orderData.values.ritiro,
        prodotti: carrello,
        totale: applicaSconto(costSum(carrello))
      })
      
      setOrderData(defaultOrderState)
      svuotaCarrello()

  }

  function applicaSconto(costo:number):number{
    if (orderData.values.codiceSconto.toLowerCase() === "bar10" ){
        return costo - costo/10;
    } else {
      return costo;
    }
  }

  return (

    <form className="flex flex-col gap-1"
    onSubmit={(e) =>confirmOrder(e)}
    >

      {/* Errori carrello vuoto*/}
      <ErrorMessage
      errori={orderData.errors.carrello}
      />


      {/* Costo carrello*/}
      <div className={cn("flex border-t-2 justify-between",
        {
          "line-through": costSum(carrello) !== applicaSconto(costSum(carrello))
        }
      )}> 
          <p>Costo Totale:</p>
          <p
            className={cn("",{
              "line-through": costSum(carrello) !== applicaSconto(costSum(carrello))
            })}
          >{carrello && FormatPrice(costSum(carrello))}</p>
      </div> 

      <div className={cn("flex justify-between",
        {
          "hidden":costSum(carrello) === applicaSconto(costSum(carrello))
        }
      )}> 
          <p>Totale Scontato -10% :</p>
          <p>{carrello && FormatPrice(applicaSconto(costSum(carrello)))}</p>
      </div> 


      {/* Input nome*/}
      <input type="text" 
      placeholder="Nome" 
      className = "px-4 py-2 border-gray-400 border rounded-2xl bg-gray-200"
      value={orderData.values.name}
      onChange={(e) => {setOrderData({...orderData, values:{...orderData.values, name: e.target.value}})}}
      />


      {/*Errori Input nome*/}
      <ErrorMessage
      errori={orderData.errors.name}
      />


      {/*Input classe*/}
      <input type="text" 
      placeholder="Classe" 
      className = "px-4 py-2 border-gray-400 border rounded-2xl bg-gray-200"
      value={orderData.values.classe}
      onChange={(e) => {setOrderData({...orderData, values:{...orderData.values, classe: e.target.value}})}}
      />


      {/*Errori Input classe*/}
      <ErrorMessage
      errori={orderData.errors.classe}
      />

      {/* Input Codice Sconto*/}
      <input type="text" 
      placeholder="Codice Sconto" 
      className = "px-4 py-2 border-gray-400 border rounded-2xl bg-gray-200"
      value={orderData.values.codiceSconto}
      onChange={(e) => {setOrderData({...orderData, values:{...orderData.values, codiceSconto: e.target.value}})}}
      />

      {/*Errori Input classe*/}
      <ErrorMessage
      errori={orderData.errors.codiceSconto}
      />

      {/*Input Ritiro */}
      <div className = "flex gap-2">
        <button
         className = {cn("px-4 py-2 bg-blue-400 rounded-lg text-white capitalize hover:cursor-pointer hover:opacity-80 shadow-lg w-1/2",
          {
            "hover:opacity-100 hover:cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.50)] bg-blue-500 border-2 font-bold" : orderData.values.ritiro === "ricreazione",
            "bg-red-500" : quantitaOrdiniARicreazione() >= 3

          }
         )}
         onClick = {() => setOrderData({...orderData, values:{...orderData.values, ritiro: "ricreazione"}})}
         disabled = {orderData.values.ritiro === "ricreazione" || quantitaOrdiniARicreazione() >= 3}
         type = "button"
        >
          ricreazione
        </button>

        <button
         className = {cn("px-4 py-2 bg-blue-400 rounded-lg text-white capitalize hover:cursor-pointer hover:opacity-80 shadow-lg w-1/2",
          {
            "hover:opacity-100 hover:cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.50)] bg-blue-500 border-2 font-bold" : orderData.values.ritiro === "pranzo"
          }
         )}
         onClick = {() => setOrderData({...orderData, values:{...orderData.values, ritiro: "pranzo"}})}
         disabled = {orderData.values.ritiro === "pranzo"}
        type = "button"
        >
          pranzo
        </button>
      </div>

      {/*Errori Input Ritiro*/}
      <ErrorMessage
      errori={orderData.errors.ritiro}
      />

      {/*Input pagamento */}
      <div className = "flex gap-2">
        <button
         className = {cn("px-4 py-2 bg-blue-400 rounded-lg text-white capitalize hover:cursor-pointer hover:opacity-80 shadow-lg w-1/2",
          {
            "hover:opacity-100 hover:cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.50)] bg-blue-500 border-2 font-bold" : orderData.values.pagamento === "contanti"
          }
         )}
         onClick = {() => setOrderData({...orderData, values:{...orderData.values, pagamento: "contanti"}})}
         disabled = {orderData.values.pagamento === "contanti"}
         type = "button"
        >
          contanti
        </button>

        <button
         className = {cn("px-4 py-2 bg-blue-400 rounded-lg text-white capitalize hover:cursor-pointer hover:opacity-80 shadow-lg w-1/2",
          {
            "hover:opacity-100 hover:cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.50)] bg-blue-500 border-2 font-bold" : orderData.values.pagamento === "carta"
          }
         )}
         onClick = {() => setOrderData({...orderData, values:{...orderData.values, pagamento: "carta"}})}
         disabled = {orderData.values.pagamento === "carta"}
        type = "button"
        >
          carta
        </button>
      </div>

      {/*Errori Input pagamento*/}
      <ErrorMessage
      errori={orderData.errors.pagamento}
      />


      {/* Input Note*/}
      <textarea
      placeholder="Note (max 100 car.)" 
      className = "px-4 py-2 border-gray-400 border rounded-2xl bg-gray-200 min-h-32"
      value={orderData.values.note}
      onChange={(e) => {setOrderData({...orderData, values:{...orderData.values, note: e.target.value}})}}
      />
      <p className={cn("px-2 text-center bg-green-400 rounded-lg w-full",
        {
          "bg-red-500": orderData.values.note.length > 100
        }
      )}
      >
        {orderData.values.note.length + "/100"}
      </p>


      {/*Errori Input note*/}
      <ErrorMessage
      errori={orderData.errors.note}
      />


      <button 
      className={cn("bg-blue-400 rounded-lg py-2 px-4 text-2xl font-bold text-white hover:opacity-80 hover:cursor-pointer",
        {
          "hover:opacity-100 hover:cursor-default bg-red-500": !carrello || carrello.length === 0
        }
      )}
      disabled = {!carrello || carrello.length === 0}
      >CONFERMA</button>



    </form>
  )
}

export default Checkoutform