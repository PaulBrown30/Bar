export type Product = {
    id: number;
    name: string;
    price: number;
    category: "panini" | "bevande" | "dolci";
}


export const menu: Product[] = [
{
    id: 1,
    name: "ciambellone",
    price: 9.99,
    category: "dolci",
},
{
    id: 2,
    name: "hotdog",
    price: 4.99,
    category: "panini",
},
{
    id: 3,
    name: "coca cola",
    price: 2.00,
    category: "bevande",
},
{
    id: 4,
    name: "bigne",
    price: 1.50,
    category: "dolci",
},
{
    id: 5,
    name: "piadina",
    price: 6.99,
    category: "panini",
},
{
    id: 6,
    name: "ciambella",
    price: 4.99,
    category: "dolci",
},
{
    id: 7,
    name: "te alla pesca",
    price: 2.49,
    category: "bevande",
},
]