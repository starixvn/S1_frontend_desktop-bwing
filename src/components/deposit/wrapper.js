import React from "react";
import { useTranslation } from "react-i18next";
import StepBar from "../common/stepBar";
import defStep from "../deposit/defStep";

export default ({ step, children }) => {
	const { t } = useTranslation();

	return (
		<div className="infoModule">
			<div className="inside-title icon-icon32px_deposit">
				{t("lbl_Deposit").toUpperCase()}
			</div>
			<div className="txt-white txt-center">
				{t("lbl_DepositOptionHint")}
			</div>
			<StepBar step={step} t={t} defStep={defStep} />
			{children}
		</div>
	);
};
