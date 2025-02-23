export function isValidInput(e){
    if(e.target.name==="itemPrice" && isNaN(e.target.value)){
        return false;
    } 
    else if(e.target.name==="itemCount" && !Number.isInteger(Number(e.target.value))){
        return false;
    }
    return true;
}

export const getBuyersPortion=(item, user)=>{
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