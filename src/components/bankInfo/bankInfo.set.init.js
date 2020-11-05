import React from "react";
import { useTranslation } from "react-i18next";
import { defActionType } from "./bankInfo.reducer";

export default ({ dispatch, numberOfAccount }) => {
	const { t } = useTranslation();
	const toNextStep = () => {
		dispatch({ type: defActionType.TO_NEXT_STEP });
	};

	return (
		<div className="walletModule">
			<div className="addBank bankselect">
				{numberOfAccount < 3 ? (
					<div className="btnGroup">
						<button onClick={toNextStep} className="btn-check">
							{t("lbl_AddBankAccount")}
						</button>
					</div>
				) : (
					<div className="btnGroup">
						<button className="btn-cancel" disabled>
							{t("lbl_BankCardsFull")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
