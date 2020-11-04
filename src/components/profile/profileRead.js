import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default props => {
	const { t } = useTranslation();
	const birth =
		props.userInfo.birth_d +
		"/" +
		props.userInfo.birth_m +
		"/" +
		props.userInfo.birth_y;

	const dataList = [
		{
			label: t("lbl_RealName"),
			value: props.userInfo.accountName,
			show: props.userInfo.accountName ? true : false
		},
		{
			label: t("lbl_Birthday"),
			value: birth,
			format: "normal",
			show: props.userInfo.birth_d ? true : false
		},
		{
			label: t("lbl_Phone"),
			value: "(" + props.userInfo.AreaCode + ")" + props.userInfo.phoneNo,
			format: "phone",
			show: props.userInfo.phoneNo ? true : false
		},
		{
			label: t("lbl_Username"),
			value: props.userInfo.userName,
			show: true
		},
		{
			label: t("lbl_Country"),
			value: props.userInfo.country,
			show: true
		},
		{
			label: t("lbl_Email"),
			value: props.userInfo.email,
			show: props.userInfo.email ? true : false
		}
		// ,
		// {
		// 	label: t("lbl_RegisterTime"),
		// 	value: moment(props.userInfo.regTime).format("DD/MM/YYYY HH:mm:ss"),
		// 	show: true
		// },
		// {
		// 	label: t("lbl_LastLogin"),
		// 	value: moment(props.userInfo.lastLogin).format(
		// 		"DD/MM/YYYY HH:mm:ss"
		// 	),
		// 	show: true
		// }
	];

	const showColumn = dataList?.filter(item => item.show);

	const MobileVerifiy = ({ item, props, t }) => {
		if (item.format !== "phone") return null;

		if (props.mobileVerificationLoading)
			return <div className="icon icon-spinner11"></div>;

		if (props.userInfo.phoneVerified)
			return (
				<button>
					<span>{t("lbl_Verified")}</span>
					<span className="icon icon-icon32px_check"></span>
				</button>
			);

		return (
			<button className="notVer" onClick={props.sendOTPSMS}>
				<span>{t("lbl_Unverified")}</span>
				<span className="icon icon-error"></span>
			</button>
		);
	};

	const layout = showColumn?.map(item => {
		return (
			<div key={`profileRead-${item.label}`}>
				<div>{item.label}</div>
				<div>{item.value}</div>
				<MobileVerifiy item={item} props={props} t={t} />
			</div>
		);
	});

	return <>{layout}</>;
};
