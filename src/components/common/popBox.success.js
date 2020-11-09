import React from "react";
import { useTranslation } from "react-i18next";

export default ({
	btnBar,
	titleIcon,
	titleText,
	onClickClose,
	message1,
	message2
}) => {
	const { t } = useTranslation();
	return (
		<div className="Cancel active">
			<div className="icon icon-close" onClick={onClickClose}></div>
			<div
				className={
					titleIcon ? `icon ${titleIcon}` : "icon icon32px_deposit "
				}></div>
			<div className="title">
				{titleText ? t(titleText) : t("lbl_Information")}
			</div>
			<div className="txt-lightgray">
				{message1 ? t(message1) : t("lbl_UpdateSuccessful")}
				<br />
				{message2 ? t(message2) : ""}
			</div>
			{btnBar}
		</div>
	);
};
