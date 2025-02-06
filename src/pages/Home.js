import InputRow from "containers/InputRow";
import { useEffect, useState } from "react";
import { isValidInput } from "utils/Utils";
import Button from "components/Button";
import EntryModifier from "containers/EntryModifier";
import "styles/Home.css";

function Home() {
  const users = [
    {name:"Amir", count:1},
    {name:"Ravi", count:1},
    {name:"Sanskar", count:1},
    {name:"Vidya", count:1}
  ];
  const [items, setItems] = useState([{'isEvenSplit':true, 'isTax':false, itemCount:1, 'users':[...users]}]);
  const [focused, setFocused] = useState();
  const [result, setResult] = useState("");

  const onItemChange = (e, indexToModify) =>{
    if(!isValidInput(e)) return;

    const tempItems = [...items];
    tempItems[indexToModify] = {
      ...tempItems[indexToModify],
      [e.target.name]:e.target.value
    }
    setItems(tempItems);
  };

  const onTaxClick = (e, indexToModify) => {
    const tempItems = [...items];
    let isSelected = e.target.getAttribute('value');
    isSelected = isSelected && isSelected === 'true';
    tempItems[indexToModify] = {
      ...tempItems[indexToModify],
      [e.target.getAttribute('name')]:!isSelected
    }
    setItems(tempItems);
  }

  const onUserClick = (e, indexToModify) => {
    let modifiedUserName = e.target.getAttribute('name');
    let currentUsers = items[indexToModify].users?[...(items[indexToModify].users)]
      ?.map(currentuser=>
          (currentuser.name === modifiedUserName)?{...currentuser, 'count':currentuser.count>0?0:1}:currentuser
      )
      :
      users.map(currentuser=>
        (currentuser.name === modifiedUserName)?{...currentuser, 'count':currentuser.count>0?0:1}:currentuser
      )
    const tempItems = [...items];
    tempItems[indexToModify] = {
      ...tempItems[indexToModify],
      users:currentUsers
    }
    setItems(tempItems);
  }

  useEffect(()=>{
    console.log(items);
    onSubmitClick();
  }, [items])

  const handleFocus = (indexFocused) => {
    setFocused(indexFocused);
  }

  const onAddClick = () =>{
    setItems([...items, {'isEvenSplit':true, 'users':[...users]}]);
    setFocused(items.length);
  }

  const onDeleteClick = (indexToDelete) =>{
    setItems((prevItems) => prevItems.filter((_, index)=>index!==indexToDelete));
  }

  const onSubmitClick = () => {
    const personToPriceMap = new Map();
    let total = 0.0;
    items.forEach(
      item=>{
      if((!item.itemName||!item.itemCount||!item.itemPrice)) return;
        item.users.forEach(
          user=>{
            let buyersPortion = getBuyersPortion(item, user);
            personToPriceMap.set(
              user.name,
              personToPriceMap.has(user.name) ? personToPriceMap.get(user.name) + buyersPortion : buyersPortion
            );
          }
        )
      }
    )
    console.log(total);
    for (const [key, value] of personToPriceMap.entries()) {
      total += value;
    }
    personToPriceMap.set('total', total);
    let res = JSON.stringify(Array.from(personToPriceMap));
    setResult(res);
  }
  
  const getBuyersPortion=(item, user)=>{
    var itemPrice = item.isTax ? item.itemPrice * 1.0825 : item.itemPrice;
    if(item.isEvenSplit){
        if(user.count==0){ return 0; }
        var total = itemPrice * item.itemCount;
        var numberOfBuyers = item.users.filter(user=>user.count>0).length;
        return total/numberOfBuyers;
    } else {
        return item.itemPrice * user.count;
    }
  }

  return (
    <div className="item-input-form">
      {
        items.map( 
          (inputItem, index) =>
            {
              
              return (
                <div 
                  className = "item-input-form-row"
                  key = {index}
                >
                  <InputRow 
                    key={index}
                    item = {inputItem}
                    onFocus = {() => handleFocus(index)}
                    onItemChange = {(e) => onItemChange(e, index)}
                    onDeleteClick = {() => onDeleteClick(index)}
                  />
                  {
                    (index===focused)?
                    <EntryModifier
                      index = {index} 
                      onTaxClick = {(e) => {return onTaxClick(e, index)}}
                      onUserClick = {(e) => {return onUserClick(e, index)}}
                      inputItem = {inputItem}
                      users = {inputItem?.users?inputItem.users:users}
                    />
                    :<></>
                  }
                </div>
              )
            }
        )
      }
      <div>
        <Button 
          label="✚"
          onClick = {onAddClick}
          variant = "add"
        />
      </div>
      <div>
        <Button 
            label="Submit"
            onClick = {onSubmitClick}
            variant = "submit"
          />
      </div>
      <div>{result}</div>
    </div>
  );
}

export default Home;
