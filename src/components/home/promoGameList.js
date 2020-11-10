import React, { useContext } from "react";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/popBox";
import { popBoxContext } from "../common/context";
import productList from "../../datas/productList";
import path from "../../path";
import { navigate } from "@reach/router";

const defLinkType = {
	default: "default",
	casino: "casino",
	sports: "sports"
};

const defGameList = [
	{
		...productList.soccer,
		img: require("../../styles/img/GameList1.png"),
		displayKey: "lbl_Soccer",
		linkType: defLinkType.sports
	},
	{
		img: require("../../styles/img/GameList2.png"),
		displayKey: "lbl_Saba1Club1",
		tpId: 1,
		gameId: 200,
		betType: 1613
	},
	{
		img: require("../../styles/img/GameList3.png"),
		displayKey: "lbl_Saba1Club2",
		tpId: 1,
		gameId: 200,
		betType: 1620
	},
	{
		img: require("../../styles/img/GameList4.png"),
		displayKey: "lbl_Saba1Club3",
		tpId: 1,
		gameId: 200,
		betType: 1612
	},
	{
		img: require("../../styles/img/GameList5.png"),
		displayKey: "lbl_Saba1Club5",
		tpId: 1,
		gameId: 200,
		betType: 1614
	},
	{
		img: require("../../styles/img/GameList6.png"),
		displayKey: "AE Baccarat",
		tpId: 15,
		gameId: 15
	},
	{
		img: require("../../styles/img/GameList7.png"),
		displayKey: "Dream Gaming Se die",
		tpId: 4
	},
	{
		img: require("../../styles/img/GameList8.png"),
		displayKey: "lbl_eSports",
		tpId: 1,
		gameId: 43
	},
	{
		img: require("../../styles/img/GameList9.png"),
		displayKey: "lbl_FishingGG",
		tpId: 7,
		gameId: 10
	},
	{
		img: require("../../styles/img/GameList10.png"),
		displayKey: "lbl_VirtualSports",
		tpId: 1,
		gameId: 180
	},
	{
		img: require("../../styles/img/GameList11.png"),
		displayKey: "lbl_Keno",
		tpId: 1,
		gameId: 202
	},
	{
		img: require("../../styles/img/GameList12.png"),
		displayKey: "lbl_Lottery",
		tpId: 1,
		gameId: 220
	}
	// {
	// 	img: require("../../styles/img/GameList8.jpg"),
	// 	displayKey: "lbl_Casino_PP_FireStrike",
	// 	tpId: 5,
	// 	gameId: "vs10firestrike",
	// 	linkType: defLinkType.casino
	// }
];

export default ({ t, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = (tpId, gameId, betType, linkType, name) => {
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (linkType === defLinkType.casino) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE(tpId, gameId, false, userInfo.langId);
			}
		} else if (linkType === defLinkType.sports) {
			navigate(`/${userInfo.langId}/${path.sports.root}?game=${name}`);
		} else {
			SET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId: tpId,
				gameId: gameId,
				isLogin: userInfo.isLogin,
				betType: betType,
				loginCallback: LoginPopBox
			});
		}
	};

	let rows = defGameList.map(g => {
		let displayText = t(g.displayKey) ?? g.displayKey;
		return (
			<button
				key={`promoGameList-${g.displayKey}`}
				onClick={ClickGame.bind(
					this,
					g.tpId,
					g.gameId,
					g.betType,
					g.linkType,
					g.name
				)}>
				<img src={g.img} alt={displayText} />
				<div>{displayText}</div>
			</button>
		);
	});

	return <div className="indexGameList">{rows}</div>;
};
