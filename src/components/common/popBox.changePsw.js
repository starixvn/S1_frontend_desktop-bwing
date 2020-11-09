import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar, titleIcon, title, message, ClickClose }) => {
	const { t } = useTranslation();

	return (
		<div className="changePassWordpop active">
			<div className="icon icon-close" onClick={ClickClose}></div>
			<div className={titleIcon ? `icon ${titleIcon}` : "icon "}></div>
			<div className="title">{title}</div>
			<div className="txt-lightgray">{message}</div>
			{btnBar}
		</div>
	);
};
