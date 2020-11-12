import React, { useContext, lazy, Suspense } from "react";
import { Link, navigate } from "@reach/router";
import {
	userInfoContext,
	popBoxContext,
	msgCountContext
} from "../common/context";
import { useTranslation } from "react-i18next";
import path from "../../path";
import DropdownHeader, { defElemType } from "../common/dropdown.headerLink";
import { LOGOUT } from "../../service/auth";
import { defPopBoxType } from "../common/popBox";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return userInfo.isLogin === true ? (
		<AfterLogin />
	) : (
		<BeforeLogin langId={userInfo.langId} />
	);
};

const BeforeLogin = ({ langId }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);

	const clickJoin = () => {
		navigate(`/${userInfo.langId}/${path.join.root}`);
	};

	const clickLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	return (
		<div className="btnGroup">
			<button className="blue login" onClick={clickLogin}>
				{t("lbl_Login")}
			</button>
			<button className="orange join" onClick={clickJoin}>
				{t("lbl_JoinNow")}
			</button>
		</div>
	);
};

const defCashierLinks = [
	{
		displayKey: "lbl_TransferFunds",
		href: path.transferFunds.root
	},
	{
		displayKey: "lbl_Withdrawal",
		href: path.withdrawal.root
	},
	{
		displayKey: "lbl_TransferHistory",
		href: path.transferHistory.root
	},
	{
		displayKey: "lbl_Statement",
		href: path.statement.root
	}
];

const defSettingLinks = ({ logoutFunc }) => {
	return [
		{
			displayKey: "lbl_Profile",
			href: path.profile.root
		},
		{
			displayKey: "lbl_BankInfo",
			href: path.bankInfo.root
		},
		{
			displayKey: "lbl_ChangePassword",
			href: path.changePassword.root
		},
		{
			displayKey: "lbl_Logout",
			href: logoutFunc,
			elemType: defElemType.btn,
			icon: "icon icon-exit"
		}
	];
};

const Wallet = lazy(() => import("./header.wallet"));
const AfterLogin = () => {
	const { msgCount } = useContext(msgCountContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();

	const handleLogout = () => {
		LOGOUT(() => {
			const ClickClose = () => {
				if (
					window.location.pathname.includes(
						`/${userInfo.langId}/${path.resetPassword.root}`
					)
				) {
					navigate(`/${userInfo.langId}`);
				}

				setPopBox({ isOpen: false });
				setUserInfo(prevState => ({
					isLogin: false,
					langId: prevState.langId,
					kickout: true,
					willLogout: true
				}));
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.LogoutHint,
				content: t("msg_loggedout"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={ClickClose}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		});
	};

	return (
		<>
			<div className="btnGroup">
				<Link
					to={`/${userInfo.langId}/${path.transferFunds.root}`}
					className="blue">
					{t("lbl_TransferFunds").toUpperCase()}
				</Link>
				<Link
					to={`/${userInfo.langId}/${path.deposit.root}`}
					className="orange">
					{t("lbl_Deposit").toUpperCase()}
				</Link>
			</div>

			{/* <Wallet langId={userInfo.langId} i18n={t} /> */}
			<Suspense fallback={<></>}>
				<Wallet langId={userInfo.langId} i18n={t} />
			</Suspense>

			<DropdownHeader
				mainKey={`header-cashierLink`}
				langId={userInfo.langId}
				className="cashier icon icon-library"
				subClassName="submenu"
				i18n={t}
				options={defCashierLinks}
				placeholder={t("lbl_Cashier")}
			/>

			<DropdownHeader
				mainKey={`header-settingLink`}
				langId={userInfo.langId}
				className="memberfile icon icon-member"
				subClassName="submenu"
				i18n={t}
				options={defSettingLinks({ logoutFunc: handleLogout })}
				placeholder={userInfo.userName}
			/>
			<Link
				className={`icon icon-email${msgCount > 0 ? " active" : ""}`}
				to={`/${userInfo.langId}/${path.message.root}`}></Link>
		</>
	);
};
