import React from "react";
import moment from "moment";
import { promoStatus } from "./promotion.def";
import { number_format } from "../common/common";

export default ({ promotionInfo, t, inListPage }) => {
	const {
		isJoin,
		status,
		custExpiryTime,
		periodTo,
		requiredAmount,
		rollOver
	} = promotionInfo;

	let expiryTime = moment.duration(
		moment
			.unix(
				isJoin && status === promoStatus.running && custExpiryTime
					? moment(custExpiryTime).unix()
					: periodTo
			)
			.diff(new Date())
	);

	let displayExpiryTime =
		expiryTime.days() +
		" " +
		t("lbl_Days") +
		" " +
		expiryTime.hours() +
		" " +
		t("lbl_Hours");
	return (
		<div className="rollover">
			<div>
				<div>{t("lbl_Bonus")}</div>
				<div>{t("lbl_MaxBonusAmount")}</div>
				{/* {requiredAmount > 0 ? (
					<div className="icon icon-icon32px_money">
						{t("lbl_MinAmount")}
					</div>
				) : null} */}
				<div>{t("lbl_RollOver").toUpperCase()}</div>
				<div>{t("lbl_RemainingTime")}</div>
			</div>

			<div className={inListPage ? "txt-yellow" : ""}>
				<div>{number_format(promotionInfo.bonus)}</div>
				<div>{number_format(promotionInfo.maxBonus)}</div>
				{/* {requiredAmount > 0 ? (
					<div>{number_format(requiredAmount)}</div>
				) : null} */}
				<div>{rollOver}X</div>
				<div>{displayExpiryTime}</div>
			</div>
		</div>
	);
};
