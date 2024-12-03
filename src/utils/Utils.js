export function isValidInput(e){
    if(e.target.name==="itemPrice" && isNaN(e.target.value)){
        return false;
    } 
    else if(e.target.name==="itemCount" && !Number.isInteger(Number(e.target.value))){
        return false;
    }
    return true;
}