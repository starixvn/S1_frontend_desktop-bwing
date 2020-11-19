import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
	const { t } = useTranslation();

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	return (
		<button className="quickLink" onClick={openLiveChat}>
			<span>{t("lbl_ContactUs")}</span>
			<img src="../../styles/img/chat.png" />
		</button>
	);
};
