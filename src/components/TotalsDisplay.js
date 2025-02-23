import { useReceipt } from "context/ReceiptProvider"

export const TotalsDisplay = ({totals}) => {
    const {result} = useReceipt();
    return (
        <div>{result}</div>
    )
}