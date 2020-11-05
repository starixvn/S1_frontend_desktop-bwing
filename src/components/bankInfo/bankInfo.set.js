import React, {
	useEffect,
	useRef,
	useContext,
	useReducer,
	useState
} from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import {
	defModule,
	reducer,
	initState,
	defActionType
} from "./bankInfo.reducer";
import { userInfoContext, popBoxContext } from "../common/context";
import InitPanel from "./bankInfo.set.init";
import BankPanel from "./bankInfo.set.bank";
import AccountPanel from "./bankInfo.set.account";
import ShowCard from "./bankInfo.showCard";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popBox";
import StepBar from "../common/stepBar";
import bankInfoStep from "./bankInfo.set.defStep";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [state, dispatch] = useReducer(reducer, initState);
	const [showTip, setShowTip] = useState(false);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		GetCustBankInfo(false);
	}, []);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const GetCustBankInfo = setAccountName => {
		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let datas = res.data.data;
						if (setAccountName) {
							setUserInfo(prev => ({
								...prev,
								accountName: datas.accountName
							}));
						}

						dispatch({
							type: defActionType.GET_CUST_BANK_INFO,
							datas: datas
						});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			}
		);
	};

	const clickTip = () => {
		let _showTip = !showTip;
		setShowTip(_showTip);
	};

	let displayModule = null;
	switch (state.displayModule) {
		case defModule.InitPanel:
			displayModule = (
				<InitPanel
					dispatch={dispatch}
					numberOfAccount={
						state.custBankList ? state.custBankList?.length : 0
					}
				/>
			);
			break;

		case defModule.BankPanel:
			displayModule = (
				<BankPanel dispatch={dispatch} bankList={state.bankList} />
			);
			break;

		case defModule.AccountPanel:
			displayModule = (
				<AccountPanel
					dispatch={dispatch}
					bankInfo={state.bankList[state.bankIdx]}
					accountNumber={state.accountNumber}
					accountName={
						userInfo.accountName
							? userInfo.accountName
							: state.accountName
					}
					alreadyHasAccountName={userInfo.accountName ? true : false}
					reload={GetCustBankInfo}
				/>
			);
			break;

		default:
			break;
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="infoModule">
				<div className="inside-title">
					{t("lbl_BankInfo").toUpperCase()}
				</div>
				<div className="txt-white">{t("lbl_UpdateBankInfo")}</div>

				{userInfo.accountName ? (
					<>
						<div className="accountName icon icon-icon32px_Profile">
							<span>{t("lbl_BankAccountName")}</span>
							<div>
								<span>{userInfo.accountName}</span>
								<button
									className="icon icon-error"
									onClick={clickTip}></button>
							</div>
						</div>
						{showTip ? (
							<div className="tip active">
								{t("lbl_ContactCSD")}
							</div>
						) : null}
					</>
				) : null}
				{state.custBankList?.length > 2 ? null : (
					<StepBar
						t={t}
						step={state.step ?? 0}
						defStep={bankInfoStep}
						className="stepBar-left"
					/>
				)}

				{displayModule}
			</div>

			<ShowCard
				accountName={state.accountName}
				custBankList={state.custBankList}
				reload={GetCustBankInfo.bind(this, false)}
			/>
		</>
	);
};
