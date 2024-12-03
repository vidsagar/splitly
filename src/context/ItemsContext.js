import { createContext } from "react";

const item = {
    'isEvenSplit':true, 
    'isTax':false, 
    'itemCount':1, 
    'users':[
        {name:"Amir", count:1},
        {name:"Ravi", count:1},
        {name:"Sanskar", count:1},
        {name:"Vidya", count:1}
    ]
};

const items = [
    {
        ...item
    }
];

const ItemsContext = createContext(items);

export default ItemsContext;