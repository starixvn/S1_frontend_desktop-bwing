import React from "react";
import { useTranslation } from "react-i18next";

export default ({
	btnBar,
	message,
	errorCode,
	icon = "icon-icon32px_notification"
}) => {
	const { t } = useTranslation();

	return (
		<div className="Error active">
			<div className={`icon ${icon}`}></div>
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">
				{message}
			</div>
			{btnBar}
		</div>
	);
};
