import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar, onClickClose }) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className="icon icon-close" onClick={onClickClose}></div>
			<div className="icon icon-icon32px_notification"></div>
			<div className="title">Oh</div>
			<div className="txt-lightgray">{t("lbl_CancelConfirm")}</div>
			{btnBar}
		</div>
	);
};
