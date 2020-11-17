import React, { useEffect, useRef, useContext } from "react";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { useTranslation } from "react-i18next";
import { setCookie, readCookie } from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defaultLang } from "../../i18n/config";

import Marquee from "./marquee";
import EventSwipper from "./eventSwipper";
import SwipperBanner from "../common/swipperBanner";
import PromoGameList from "./promoGameList";
import TandC from "../../service/t_and_c";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			let cookieName = `balanceHint${userInfo.userName}`;
			let showDepositHint = false;
			if (readCookie(cookieName) !== "1") {
				setCookie(cookieName, "1", 1);
				showDepositHint = true;
			}

			if (showDepositHint) {
				api_account_GetWalletInfo().then(res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						let tpWallets = res.data.data.tpWallets?.map(t => {
							return {
								tpId: t.tpId,
								balance: t.balance
							};
						});

						let hasBalance =
							res.data.data?.balance ||
							tpWallets?.filter(t => {
								return t.balance > 0;
							}).length >= 1;

						if (!hasBalance && showDepositHint) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.DepositHint
							});
						}
					}
				});
			}
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	// const getDepositWithdrawImage = () => {
	// 	if (userInfo.langId === "en") {
	// 		return require(`../../styles/img/D&W.png"`);
	// 	} else {
	// 		return require(`../../styles/img/D&W_vn.png"`);
	// 	}
	// };

	return (
		<main>
			<SwipperBanner ImgFolder="Promotion" filterHideInHome={true} />
			<Marquee />
			<section>
				<EventSwipper />
			</section>
			<section>
				<PromoGameList t={t} userInfo={userInfo} />
			</section>
			<section>
				<div className="guide">
					<div className="guidelist">
						<span className="title">{t("lbl_UserGuide")}</span>
						<UserGuide t={t} langId={userInfo.langId} />
					</div>
					<div className="exGroup">
						<div className="ex">
							<img
								src={require("../../styles/img/24hr.png")}
								alt="24/7 customer care service"
							/>
							<ul>
								<li className="title">
									{t("lbl_ExcellentCustomerCare")}
								</li>
								<li>{t("lbl_ExcellentCustomerCareDesc")}</li>
							</ul>
						</div>
						<div className="ex">
							<img
								src={require("../../styles/img/games.png")}
								alt="games"
							/>
							<ul>
								<li className="title">
									{t("lbl_ExtensiveGames")}
								</li>
								<li>{t("lbl_ExtensiveGamesDesc")}</li>
							</ul>
						</div>
					</div>
					<div>
						<img
							src={
								userInfo.langId === defaultLang
									? require("../../styles/img/D&W.png")
									: require(`../../styles/img/D&W_${userInfo.langId}.png`)
							}
							alt="deposit and withdrawal"
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

const UserGuide = ({ t, langId }) => {
	return (
		<ul>
			<li className="icon icon-deposit1">
				<a href={TandC(langId).Deposit}>{t("lbl_HowToDepoist")}</a>
			</li>
			<li className="icon icon-withdrawal1">
				<a href={TandC(langId).Withdraw}>{t("lbl_HowToWithdraw")}</a>
			</li>
			<li className="icon icon-play">
				<a href={TandC(langId).HowToPlay}>{t("lbl_HowToPlay")}</a>
			</li>
			<li className="icon icon-FAQS">
				{<a href={TandC(langId).FAQ}>{t("lbl_FAQ")}</a>}
			</li>
		</ul>
	);
};
