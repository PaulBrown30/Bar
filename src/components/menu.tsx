import type { Product } from "../data/menu"
import { ProductRow } from "./productrow"

type MenuProps = {
    menu: Product[],
    addCarrello: (id: number) => void,
    disabledAdd: (id: number) => boolean,
}


const Menu = ({menu,addCarrello,disabledAdd} : MenuProps) => {


  const categorie = ["panini","bevande","dolci"]

  return (
    <div>
    <p className="mb-2 font-bold text-3xl">PRODOTTI</p>
    {categorie.map(categoria => 
        <div key={categoria} className="flex flex-col gap-2 justify-center align-middle p-4">
        <p className="font-bold text-2xl capitalize">{categoria}</p>
        {menu.filter(product => product.category === categoria).map(product => <ProductRow
        product={product}
        onClick = {() => {addCarrello(product.id)}}
        key={product.id}
        disabledAdd = {disabledAdd(product.id)}
        />)}
    </div>  
    )}
    </div>
  )
}

export default Menu