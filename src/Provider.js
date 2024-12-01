import React from "react";

export const Provider = ({children})=>{
    const users = [
        {name:"Amir", count:1},
        {name:"Ravi", count:1},
        {name:"Sanskar", count:1},
        {name:"Vidya", count:1}
      ];
    const [items, setItems] = useState([{'isEvenSplit':true, 'isTax':false, itemCount:1, 'users':[...users]}]);
}