import { TotalsDisplay } from "components/TotalsDisplay";
import { ReceiptProvider } from "context/ReceiptProvider";
import { UserManager } from "components/UserManager";
import { Receipt } from "components/Receipt";
import "styles/Home.css";


export const FairShare = () => {

	return (
		<ReceiptProvider>
			<UserManager />
			<Receipt />
			<TotalsDisplay />
		</ReceiptProvider>
	)
}
