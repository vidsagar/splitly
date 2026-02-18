import { useReceipt } from "context/ReceiptProvider"
import { getBuyersPortion } from "utils/Utils";
import { useMemo } from "react";

export const TotalsDisplay = () => {

	const { users, items } = useReceipt();

	const [total, splitMap] = useMemo(() => {
		const personToPriceMap = new Map();
		let total = 0.0;
		items.forEach(
			item => {
				if ((!item.itemName || !item.itemCount || !item.itemPrice)) return;
				var itemPrice = item.isTax ? item.itemPrice * 1.0825 : item.itemPrice;
				total += +itemPrice;
				item.users.forEach(
					user => {
						let buyersPortion = getBuyersPortion(item, user);
						personToPriceMap.set(
							user.userId,
							{
								username: users.find(globalUser => globalUser.userId === user.userId).username,
								portion: personToPriceMap.has(user.userId) ? personToPriceMap.get(user.userId).portion + buyersPortion : buyersPortion,
							}
						);
					}
				)
			}
		)

		return [total, personToPriceMap];
	}, [items, users]);

	return (
		<aside className="split-summary">
			<h2 className="split-summary__title">Who owes what</h2>

			<ul className="split-summary__list">
				{
					Array.from(splitMap.entries())
						.map(([entryKey, entryValue]) =>
							<li key={entryKey} className="split-summary__row">
								<span className="split-summary__name">{entryValue.username}</span>
								<span className="split-summary__amount">
									${entryValue.portion.toFixed(2)}
								</span>
							</li>
						)
				}
			</ul>

			<div className="split-summary__footer">
				<span>Total</span>
				<span className="split-summary__total">
					${total.toFixed(2)}
				</span>
			</div>
		</aside>
	);
}
