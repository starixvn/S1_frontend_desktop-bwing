import React, { useContext } from "react";
import path from "../../path";
import productList, { defCasinoProviders } from "../../datas/productList";
import { navigate } from "@reach/router";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";

const defPlatfrom = [
	{
		path: path.sports.root,
		parameter: { game: "soccer" },
		imgName: "saba"
	},
	{
		...productList.liveCasino_Allbet,
		imgName: "ab"
	},
	{
		...productList.fishing,
		imgName: "yl"
	},
	{
		...productList.liveCasino_AG,
		imgName: "ag"
	},
	{
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.GPI.name },
		imgName: "gp"
	},
	{
		...productList.liveCasino_DG,
		imgName: "dg"
	},
	{
		...productList.liveCasino_SA,
		imgName: "sa"
	},
	{
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.YGG.name },
		imgName: "yg"
	},
	{
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PP.name },
		imgName: "pp"
	},
	{
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SG.name },
		imgName: "sg"
	},
	{
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PG.name },
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
