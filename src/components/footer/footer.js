import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import Bettings from "./footer.bettings";
import OurPolicies from "./footer.ourPolicies";
import HelpSupport from "./footer.helpSupport";
import Promotions from "./footer.promotions";
import About from "./footer.about";
import config from "../../config";
import PlatformSection from "./footer.platform";

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
					<span className="title">{t("lbl_SocialMedia")}</span>
					<div>
						<a
							href="https://www.facebook.com/bwingofficial/"
							target="_blank"
							className="icon icon-facebook"></a>
						<a
							href="https://twitter.com/Bwingofficial/"
							target="_blank"
							className="icon icon-twitter"></a>
					</div>
				</div>

				{/* <div>
					<span className="title">{t("lbl_ContactUs")}</span>
					<div>{t("lbl_ConatctUsHint")}</div>
				</div> */}
			</div>
			<div>
				<PlatformSection
					t={t}
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
				/>
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