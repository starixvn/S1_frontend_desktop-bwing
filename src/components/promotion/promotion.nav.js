import React from "react";
import { defPromotionType } from "./promotion.def";

export const defFilterType = {
	all: 0,
	expiry: 999,
	firstDeposit: 1,
	redeposit: 2,
	freeBet: 3,
	Rebate_and_cashback: [defPromotionType.rebate, defPromotionType.cashback]
};

export default ({ t, onClick, selected }) => {
	const defPromoNavs = [
		{
			displayKey: "lbl_All",
			value: defFilterType.all,
			className: "blueBorder"
		},
		{
			displayKey: "PromotionCategory1",
			value: defFilterType.firstDeposit,
			className: "blueBorder"
		},
		{
			displayKey: "lbl_FreeBet",
			value: defFilterType.freeBet,
			className: "blueBorder"
		},
		{
			displayKey: "lbl_PromotionRebateAndCashback",
			value: defFilterType.Rebate_and_cashback,
			className: "blueBorder"
		},
		{
			displayKey: "lbl_Redeposit_Promo",
			value: defFilterType.redeposit,
			className: "blueBorder"
		},

		{
			displayKey: "lbl_Expired",
			value: defFilterType.expiry,
			className: "lightgray",
			selectedClass: "red"
		}
	];

	let rows = defPromoNavs.map(p => {
		return (
			<button
				key={`promo-nav-${p.displayKey}`}
				className={
					p.value === selected
						? p.selectedClass
							? p.selectedClass
							: "blueGradient"
						: p.className
				}
				onClick={onClick.bind(this, p.value)}>
				{t(p.displayKey).toUpperCase()}
			</button>
		);
	});
	return (
		<div className="quickSelect">
			<div className="btnGroup promoType">{rows}</div>
		</div>
	);
};
