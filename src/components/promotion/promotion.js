import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { api_promotion_GetPromotionListV2 } from "../../service/api/promotion";
import { api_account_GetCustSpecificBonus } from "../../service/api/account";
import PromotionList from "./promotion.list";
import PromotionNavBar, { defFilterType } from "./promotion.nav";
import { isExpiry } from "./promotion.common";
import Loading from "../common/loading";
import { isNew } from "./promotion.common";

export default () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);

	const { userInfo } = useContext(userInfoContext);

	const [filter, setFilter] = useState(defFilterType.all);
	const [initPromoList, setInitPromoList] = useState(null);
	const [promoList, setPromoList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		if (userInfo.isLogin === null) return;

		getPromotionListV2();
	}, [userInfo.isLogin, userInfo.langId]);

	const getPromotionListV2 = () => {
		api_promotion_GetPromotionListV2({ langId: userInfo.langId }).then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					let fakeData = [
						{
							bonusCode: "freebet Test",
							promotionType: 3,
							title: "Now everyone have free bets",
							description: "kasi free",
							banner:
								"https://www.nova88.net/CMS/Nova88/Promotion/en/banner-ae.jpg?v=a4xydDp9Ju4gMQR8Zd19yRN5BVcRqZIr9kynOcOm6XQ",
							periodFrom: 1605759140,
							periodTo: 1605800000,
							rollOver: 15,
							details: null,
							bonus: 5.0,
							maxBonus: 5.0,
							bonusType: 2,
							sort: 2,
							categoryId: 1,
							tpId: 0,
							custRollOver: 0,
							custTurnOver: 0,
							status: 0,
							custExpiryTime: null,
							canJoin: false,
							isJoin: false
						},
						{
							bonusCode: "FTDP",
							promotionType: 1,
							title: "Fishing Rebate 0.8%",
							description:
								"JOIN NOW ! To enjoy up to MYR 388 Bonus with your first deposit at Nova88!",
							banner:
								"http://www.n88dev.com/CMS/Nova88/Promotion/en/banner-FishingRebate.jpg",
							periodFrom: 1605759140,
							periodTo: 1605800000,
							rollOver: 15,
							details: null,
							bonus: 50.0,
							maxBonus: 500.0,
							bonusType: 1,
							sort: 1,
							categoryId: 4,
							tpId: 1,
							custRollOver: 0,
							custTurnOver: 0,
							status: 0,
							custExpiryTime: null,
							canJoin: false,
							isJoin: false
						},
						{
							bonusCode: "SLOTFREEBET",
							promotionType: 2,
							title: null,
							description: null,
							banner: null,
							periodFrom: 1605759140,
							periodTo: 1605800000,
							rollOver: 25,
							details: null,
							bonus: 20.0,
							maxBonus: 0.0,
							bonusType: 2,
							sort: 1,
							categoryId: 1,
							tpId: 0,
							custRollOver: 0,
							custTurnOver: 0,
							status: 0,
							custExpiryTime: null,
							canJoin: false,
							isJoin: false
						}
					];

					let result = fakeData.sort((a, b) => {
						return a.periodFrom > b.periodFrom ? -1 : 1;
					});
					setInitPromoList(result);
					SetPromotionDatas(result, filter);
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					alert(t("msg_ApiServerError"));
				}
				setLoading(false);
			}
		);
	};

	const SetPromotionDatas = (_promoList, type) => {
		let afterFilterList = [];
		if (type === defFilterType.all) {
			afterFilterList = _promoList.filter(
				p => !isExpiry({ ...p, isLogin: userInfo.isLogin })
			);
		} else if (type === defFilterType.expiry) {
			afterFilterList = _promoList.filter(p =>
				isExpiry({ ...p, isLogin: userInfo.isLogin })
			);
		} else if (type === defFilterType.firstDeposit) {
			afterFilterList = _promoList.filter(
				p =>
					(p.promotionType === type || p.promotionType === 5) &&
					!isExpiry({ ...p, isLogin: userInfo.isLogin })
			);
		} else {
			afterFilterList = _promoList.filter(
				p =>
					p.promotionType === type &&
					!isExpiry({ ...p, isLogin: userInfo.isLogin })
			);
		}

		setPromoList(afterFilterList);
	};

	const SelectPromotionType = type => {
		if (initPromoList) {
			SetPromotionDatas(initPromoList, type);
		}
		setFilter(type);
	};

	const RefreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api_account_GetCustSpecificBonus({
			BonusCode: bonusCode,
			TpId: tpId,
			PromoCategoryId: categoryId
		}).then(
			res => {
				if (
					isMountedRef.current &&
					res.data.errorCode === 0 &&
					res.data.data
				) {
					let idx = initPromoList.findIndex(
						x =>
							x.bonusCode === bonusCode &&
							x.tpId === tpId &&
							x.categoryId === categoryId
					);

					if (idx !== -1) {
						let newPromoList = [...initPromoList];
						newPromoList[idx].custRollOver = res.data.data.rollover;
						newPromoList[idx].custTurnOver = res.data.data.turnover;

						setInitPromoList(newPromoList);
						SetPromotionDatas(newPromoList, filter);
					}
				}
			},
			err => {}
		);
	};

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title">
				<span>{t("lbl_Promotion_list")}</span>
			</div>
			<PromotionNavBar
				t={t}
				onClick={SelectPromotionType}
				selected={filter}
			/>

			<PromotionList
				t={t}
				filter={filter}
				userInfo={userInfo}
				promoList={promoList}
				RefreshProcessBar={RefreshProcessBar}
				getPromotionListV2={getPromotionListV2}
			/>
		</div>
	);
};
