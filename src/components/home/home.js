import React, { useEffect, useRef, useContext } from "react";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { useTranslation } from "react-i18next";
import { setCookie, readCookie } from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";

import Bong88 from "../../styles/img/bong88.png";

import Marquee from "./marquee";
import News from "./news";
import EventSwipper from "./eventSwipper";
import config from "../../config";
import GameQuickLinks from "./gameQuickLinks";
import SwipperBanner from "../common/swipperBanner";
import CountDown from "./countDown";
import PromoGameList from "./promoGameList";

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

	return (
		<main>
			<SwipperBanner ImgFolder="Promotion" filterHideInHome={true} />
			<Marquee />
			<CountDown />
			<GameQuickLinks t={t} />
			<PromoGameList t={t} userInfo={userInfo} />
			<section>
				<EventSwipper />
				<News />

				<Platforms />
				<div className="powered">
					<div>{t("lbl_PoweredBy")}</div>
					<img src={Bong88} alt="Bong88" />
				</div>
			</section>
		</main>
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

	return <div className="platform">{platformRows}</div>;
};
