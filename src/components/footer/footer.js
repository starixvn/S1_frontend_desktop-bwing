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
				<div>
					<HelpSupport langId={userInfo.langId} t={t} />
					<Promotions langId={userInfo.langId} t={t} />
				</div>
				<About langId={userInfo.langId} t={t} />

				<div>
					<span className="title">{t("lbl_SocialMedia")}</span>
					<div>
						<a
							href="https://www.facebook.com/Bwingtttt "
							className="icon icon-facebook"
							target="_blank">
							Facebook
						</a>
						<a
							href="https://www.youtube.com/channel/UCDvFS9eTrOEYuVjb3BNQ3bg/featured"
							className="icon icon-youtube"
							target="_blank">
							YouTube
						</a>
						<a
							href="https://twitter.com/bwingofficial"
							className="icon icon-twitter"
							target="_blank">
							Twitter
						</a>
						<a
							href="https://www.tiktok.com/@bwingpro"
							className="icon icon-tiktok"
							target="_blank">
							TikTok
						</a>
					</div>
				</div>
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
