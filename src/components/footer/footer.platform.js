import React, { useContext } from "react";
import path from "../../path";
import { footerProductList } from "../../datas/productList";
import { navigate } from "@reach/router";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";

const defPlatfrom = [
	{
		path: path.sports.root,
		parameter: { ...footerProductList.sports },
		imgName: "saba"
	},
	{
		...footerProductList.liveCasino_Allbet,
		imgName: "ab"
	},
	{
		...footerProductList.fishing,
		imgName: "yl"
	},
	{
		...footerProductList.liveCasino_AG,
		imgName: "ag"
	},
	{
		path: path.casino.root,
		parameter: { ...footerProductList.casino_GPI },
		imgName: "gp"
	},
	{
		...footerProductList.liveCasino_DG,
		imgName: "dg"
	},
	{
		...footerProductList.liveCasino_SA,
		imgName: "sa"
	},
	{
		path: path.casino.root,
		parameter: { ...footerProductList.casino_YGG },
		imgName: "yg"
	},
	{
		path: path.casino.root,
		parameter: { ...footerProductList.casino_PP },
		imgName: "pp"
	},
	{
		path: path.casino.root,
		parameter: { ...footerProductList.casino_SG },
		imgName: "sg"
	},
	{
		path: path.casino.root,
		parameter: { ...footerProductList.casino_PG },
		imgName: "pg"
	}
];

export default ({ langId, isLogin }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickItem = ({ path, urlParams, tpId, gameId }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (path) {
			navigate(`/${langId}/${path}${urlParams}`);
		} else {
			SET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback: loginCallback
			});
		}
	};

	let rows = defPlatfrom.map(p => {
		let key = `footer-platform-${p.tpId}-${p.gameId}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(key => {
				return `${key}=${p.parameter[key]}`;
			});
		}

		let _urlParams = params !== null ? `?${params.join("&")}` : "";

		return (
			<button
				key={key}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}>
				<img
					alt="logo"
					src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
				/>
			</button>
		);
	});

	return <div className="platformGroup">{rows}</div>;
};
