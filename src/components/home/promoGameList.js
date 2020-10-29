import React, { useContext } from "react";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/popBox";
import { popBoxContext } from "../common/context";

const defLinkType = {
	default: "default",
	casino: "casino"
};

const defGameList = [
	{
		img: require("../../styles/img/GameList1.jpg"),
		displayKey: "Sedie",
		tpId: 4,
		gameId: 71401
	},
	{
		img: require("../../styles/img/GameList2.jpg"),
		displayKey: "lbl_Saba1Club1",
		tpId: 1,
		gameId: 200,
		betType: 1613
	},
	{
		img: require("../../styles/img/GameList3.jpg"),
		displayKey: "lbl_Saba1Club2",
		tpId: 1,
		gameId: 200,
		betType: 1620
	},
	{
		img: require("../../styles/img/GameList4.jpg"),
		displayKey: "lbl_Saba1Club3",
		tpId: 1,
		gameId: 200,
		betType: 1612
	},
	{
		img: require("../../styles/img/GameList5.jpg"),
		displayKey: "lbl_Saba1Club4",
		tpId: 1,
		gameId: 200,
		betType: 1615
	},
	{
		img: require("../../styles/img/GameList6.jpg"),
		displayKey: "lbl_Saba1Club5",
		tpId: 1,
		gameId: 200,
		betType: 1614
	},
	{
		img: require("../../styles/img/GameList7.jpg"),
		displayKey: "Baccarat",
		tpId: 15
	},

	{
		img: require("../../styles/img/GameList8.jpg"),
		displayKey: "lbl_Casino_PP_FireStrike",
		tpId: 5,
		gameId: "vs10firestrike",
		linkType: defLinkType.casino
	}
];

export default ({ t, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = (tpId, gameId, betType, linkType) => {
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
					g.linkType
				)}>
				<img src={g.img} alt={displayText} />
				<div>{displayText}</div>
			</button>
		);
	});

	return <div className="indexGameList">{rows}</div>;
};
