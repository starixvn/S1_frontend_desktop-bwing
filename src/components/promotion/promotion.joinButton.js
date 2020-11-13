import React, { useRef, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/popBox";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../path";
import { navigate } from "@reach/router";

export default ({
	promotionInfo,
	userInfo,
	_isExpiry,
	_isClaimed,
	inListPage,
	callBack
}) => {
	const { t } = useTranslation();
	const { isLogin } = userInfo;
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-icon32px_notification",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const setClaimPromotion = async (langId, bonusCode) => {
		return api_promotion_SetClaimPromotion({
			langId,
			BonusCode: bonusCode
		}).then(
			({ data: { message, errorCode } }) => {
				if (!isMountedRef.current) return;
				const success = errorCode === 0;
				const OTPNotVerify = errorCode === -5;
				if (OTPNotVerify)
					return setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.OTPHint,
						btnBar: (
							<div className="btnGroup">
								<Link
									className="btn-check"
									to={`/${langId}/${path.profile.root}?prevPage=${path.promotion.root}&BonusCode=${bonusCode}`}>
									{t("lbl_UpdatePersonalDetail")}
								</Link>
							</div>
						)
					});
				if (success) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Success,
						titleText: "lbl_Congratulations",
						titleIcon: "icon-gift",
						message1: "lbl_Sign_up_successful",
						onClickClose: clickClose,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={clickClose}>
									OK
								</button>
							</div>
						)
					});
					return true;
				}
				openErrorMessagePopBox(message || "error", errorCode);
			},
			err => {
				if (isMountedRef.current) return;

				openErrorMessagePopBox();
			}
		);
	};

	const onJoinPromotion = async () => {
		const { langId } = userInfo;
		const { bonusCode } = promotionInfo;
		const promotionCanJoin = checkPromotion({
			promotionInfo,
			userInfo,
			setPopBox,
			t
		});
		if (!promotionCanJoin) return;
		let success = await setClaimPromotion(langId, bonusCode);
		if (success) return callBack();
	};

	// if ((promotionInfo.isJoin && isLogin) || _isExpiry) return null;

	const clickBack = () => {
		navigate(`/${userInfo.langId}/${path.promotion.root}`);
	};

	return (
		<>
			{inListPage ? null : (
				<button className="lightgray" onClick={clickBack}>
					{t("lbl_back").toUpperCase()}
				</button>
			)}
			{(promotionInfo.isJoin && isLogin) ||
			_isExpiry ||
			_isClaimed ? null : (
				<button className="orange" onClick={onJoinPromotion}>
					{t("lbl_PromoJoinNow").toUpperCase()}
				</button>
			)}
		</>
	);
};
