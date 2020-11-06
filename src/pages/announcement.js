import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { api_message_GetAnnouncement } from "../service/api/message";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import moment from "moment";
import Loading from "../components/common/loading";
import { defPopBoxType } from "../components/common/popBox";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getAnnouncement, setGetAnnouncement] = useState([]);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		api_message_GetAnnouncement(userInfo.langId).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let fakeData = {
							data: [
								{
									id: 1,
									subject:
										"We are pleased to announce that our Company have Official Facebook, Instagram and Twitter account - nova88official!",
									content:
										"To our valued Members: \n\nWe are pleased to announce that our Company have Official Facebook, Instagram and Twitter account - nova88official! \nKindly be reminded that our Company only have three official social accounts, while other accounts appeared in any social platform IS NOT our company's official accounts. \nTherefore, we would like to bring it to your attention on any fraudulent social account. \nShould you have any inquiries, please do not hesitate to contact Nova88’s Customer Service.\n\nNova88’s Customer Service",
									startTime: "2020-04-14T12:00:00-04:00"
								},
								{
									id: 2,
									subject:
										"Our company would like to take this opportunity to remind our valued customers change your password frequently to keep your account safe. ",
									content:
										"Dear valued customer: \n\nIt is safe to have an unique password for your account. \nOur company would like to take this opportunity to remind our valued customers change your password frequently to keep your account safe. \n\nThank you.",
									startTime: "2020-04-14T12:00:00-04:00"
								}
							],
							errorCode: 0,
							message: "",
							rawErrorCode: "",
							rawMessage: ""
						};

						setGetAnnouncement(fakeData.data);

						// setGetAnnouncement(res.data.data);
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
	}, []);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	let arr = getAnnouncement?.map(item => {
		let isToday =
			moment(item.startTime).format("YYYY-MM-DD") ===
			moment().format("YYYY-MM-DD");

		let displayTime = isToday
			? moment(item.startTime).format("hh:mm:ss A")
			: moment(item.startTime).format("MM/DD/YYYY");

		return (
			<div key={`announcement-${item.id}`}>
				<div className="listHeader">
					<div>{item.subject}</div>
					<div>{displayTime}</div>
				</div>
				<pre className="listBody">{item.content}</pre>
			</div>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title">
				<span>{t("lbl_Announcement")}</span>
			</div>
			<div className="announcement">
				<div className="list">{arr}</div>
			</div>
		</div>
	);
};
