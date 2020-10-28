import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import config from "../../config";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<footer>
			<div className="webmap">
				<Bettings
					t={t}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
				/>
				<OurPolicies langId={userInfo.langId} t={t} />
				<HelpSupport langId={userInfo.langId} t={t} />
				<Promotions langId={userInfo.langId} t={t} />
				<About langId={userInfo.langId} t={t} />

				<div>
					<span className="title">{t("lbl_ContactUs")}</span>
					<div>{t("lbl_ConatctUsHint")}</div>
				</div>
			</div>
			<div>
				<Platforms />
				<div className="powered">
					<div>{t("lbl_PoweredBy")}</div>
					<img
						src={require("../../styles/img/bong88.png")}
						alt="Bong88"
					/>
				</div>
			</div>
			<div className="copyright">
				© Copyright 2020. Bwing. All Rights Reserved.
			</div>
		</footer>
	);
};

const defPlatform = [
	"saba",
	"ab",
	"yl",
	"ag",
	"gp",
	"dg",
	"sa",
	"yg",
	"pp",
	"sg",
	"pg"
];

const Platforms = () => {
	const platformRows = defPlatform.map(item => {
		return (
			<button key={`platform-${item}`}>
				<img
					alt="logo"
					src={`${config.imgUrl}/common/images/logo/${item}.png`}
				/>
			</button>
		);
	});

	return <div className="platformGroup">{platformRows}</div>;
};
