import { ReceiptProvider } from "context/ReceiptProvider";
import { UserManager } from "components/userManager/UserManager";
import { Receipt } from "components/Receipt";
import { TotalsDisplay } from "components/TotalsDisplay";

const ReceiptEditor = () => {

	return (
		<ReceiptProvider>
			<UserManager />
			<Receipt />
			<TotalsDisplay />
		</ReceiptProvider>
	)
}

export default ReceiptEditor;
