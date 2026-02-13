import React from "react";
import { useState } from "react";
import ReceiptEditor from "./ReceiptEditor";
import "./ReceiptGallery.scss";

export const ReceiptGallery = () => {

	const [currentView, setCurrentView] = useState('receipts');
	const [receipts, setReceipts] = useState([
		{ id: 1, store: "Whole Foods", date: "2026-02-10", total: 45.50 },
		{ id: 2, store: "Apple Store", date: "2026-02-08", total: 129.00 },
		{ id: 3, store: "Whole Foods", date: "2026-02-10", total: 45.50 },
		{ id: 4, store: "Apple Store", date: "2026-02-08", total: 129.00 },
		{ id: 5, store: "Whole Foods", date: "2026-02-10", total: 45.50 },
		{ id: 6, store: "Apple Store", date: "2026-02-08", total: 129.00 },
		{ id: 7, store: "Whole Foods", date: "2026-02-10", total: 45.50 },
		{ id: 8, store: "Apple Store", date: "2026-02-08", total: 129.00 },
	]);

	const handleAddReceiptClick = () => {
		setCurrentView('editor');
	}

	const addReceiptCard = (
		<div className="card add-receipt-card" onClick={handleAddReceiptClick}>
			<div className="plus-icon">+</div>
		</div>
	);

	return (
		<>
			{currentView === 'receipts' ? (
				<div className="receipt-gallery-container">
					{receipts.map(receipt => (
						<div key={receipt.id} className="card receipt-card">
							<h3 className="store-name">{receipt.store}</h3>
							<p className="date">{receipt.date}</p>
							<div className="icon">📄</div>
							<p className="total">${receipt.total.toFixed(2)}</p>
						</div>
					))}
					{addReceiptCard}
				</div>
			) : (
				<ReceiptEditor onBackClick={() => setCurrentView('editor')} />
			)}
		</>
	)
}
