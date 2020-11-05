import React, { useEffect, useState, useRef, useContext } from "react";
import { api_payment_GetStatement } from "../service/api/payment";
import { number_format } from "../components/common/common";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Filter from "../components/common/historyFilter";
import moment from "moment";
import LeftMenu from "../components/common/leftMenu";
import Loading from "../components/common/loading";
import { defPopBoxType } from "../components/common/popBox";
import ReloadSpin from "../components/common/reloadSpin";

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

const initPagination = {
	totalPages: 0,
	currentPage: 1
};

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getHistory, setGetHistory] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [pagination, setPagination] = useState(initPagination);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const GetStatement = (transactionData, pageNumber) => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		api_payment_GetStatement({
			...transactionData,
			PageNumber: pageNumber
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						let fakeData = {
							data: [
								{
									type: null,
									changeAmount: 300000.0,
									beforeAmount: 6200.0,
									afterAmount: 306200.0,
									refTransId: "WD87",
									createTime: "2020-07-27T03:46:55-04:00",
									direction: 1,
									typeName: "Cancelled Withdrawal"
								},
								{
									type: null,
									changeAmount: 100.0,
									beforeAmount: 6100.0,
									afterAmount: 6200.0,
									refTransId: "AD477",
									createTime: "2020-07-13T05:53:40-04:00",
									direction: 1,
									typeName: "Payment Adjustment Debit"
								},
								{
									type: null,
									changeAmount: 1000.0,
									beforeAmount: 7100.0,
									afterAmount: 6100.0,
									refTransId: "TD2857",
									createTime: "2020-07-13T04:14:31-04:00",
									direction: 2,
									typeName: "Saba Sports"
								},
								{
									type: null,
									changeAmount: 7100.0,
									beforeAmount: 0.0,
									afterAmount: 7100.0,
									refTransId: "TD2856",
									createTime: "2020-07-03T06:58:08-04:00",
									direction: 1,
									typeName: "Saba Sports"
								},
								{
									type: null,
									changeAmount: 7100.0,
									beforeAmount: 7100.0,
									afterAmount: 0.0,
									refTransId: "TD2855",
									createTime: "2020-07-03T06:56:01-04:00",
									direction: 2,
									typeName: "Saba Sports"
								}
							],
							totalPages: 2,
							pageNumber: 1,
							rowCount: 10,
							errorCode: 0,
							message: "",
							rawErrorCode: "",
							rawMessage: ""
						};

						setGetHistory(fakeData.data);
						setPagination(prev => ({
							...prev,
							totalPages: fakeData.totalPages
						}));

						// setGetHistory(res.data.data);
						// setPagination(prev => ({
						// 	...prev,
						// 	totalPages: res.data.totalPages
						// }));
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
					setProcessing(false);
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
					setProcessing(false);
				}
			}
		);
	};

	const clickDateSubmit = (startDate, endDate, isUnix, quickPick) => {
		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;

			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDate).unix(),
					EndDate: moment(endDate).endOf("day").unix()
				};
				setFilterData(transactionData);

				setKeepData({
					startDate: startDate,
					endDate: endDate,
					quickPick: quickPick
				});
			}

			setPagination(prev => ({ ...prev, currentPage: 1 }));
			GetStatement(transactionData, 1);
		}
	};

	const clickPageNumber = page => {
		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			setPagination(prev => ({ ...prev, currentPage: page }));

			GetStatement(transactionData, page);
		}
	};

	let arr = getHistory?.map((item, i) => {
		return (
			<TansactionHistory
				key={`statement-${item.refTransId}-${item.typeName}`}
				idx={i + 1}
				createTime={item.createTime}
				refTransId={item.refTransId}
				typeName={item.typeName}
				changeAmount={item.changeAmount}
				beforeAmount={item.beforeAmount}
				afterAmount={item.afterAmount}
			/>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_Statement")}</span>
			</div>
			<Filter submitHandler={clickDateSubmit} keepData={keepData} />

			{getHistory ? (
				<div className="list history">
					<div className="tip active">{t("msg_AmountFormatTip")}</div>
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>
							{t("lbl_Date")} ({moment().format("Z")})
						</div>
						<div>{t("lbl_RefTransId")}</div>
						<div>{t("lbl_TypeName")}</div>
						<div>{t("lbl_ChangeAmount")}</div>
						<div>{t("lbl_BeforeAmount")}</div>
						<div>
							{t("lbl_AfterAmount")}
							<ReloadSpin
								func={clickDateSubmit.bind(
									this,
									filterData?.StartDate,
									filterData?.EndDate
								)}
							/>
						</div>
					</div>
					{getHistory?.length > 0 ? (
						<div className="listBody">{arr}</div>
					) : (
						<div className="nodata">{t("msg_NoData")}</div>
					)}
				</div>
			) : null}

			{pagination.totalPages !== 0 ? (
				<Pagination
					totalPages={pagination.totalPages}
					currentPage={pagination.currentPage}
					clickPageNumber={clickPageNumber}
				/>
			) : null}
		</div>
	);
};

const TansactionHistory = props => {
	return (
		<div>
			<div>{props.idx}</div>
			<div>
				{moment(props.createTime).format("DD/MM/YYYY")}
				<span className="txt-blue15">
					{moment(props.createTime).format("HH:mm:ss")}
				</span>
			</div>
			<div>{props.refTransId}</div>
			<div>{props.typeName}</div>
			<div>{number_format(props.changeAmount, false)}</div>
			<div>{number_format(props.beforeAmount, false)}</div>
			<div>{number_format(props.afterAmount, false)}</div>
		</div>
	);
};
