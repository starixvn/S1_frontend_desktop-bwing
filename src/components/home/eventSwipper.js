import React from "react";
import SwipperBanner from "../common/swipperBanner";
import Rebate_VN from "../../styles/img/Daily rebate vn.png";
import Rebate_EN from "../../styles/img/Daily rebate.png";

export default ({ langId }) => {
	return (
		<div className="offers">
			<SwipperBanner
				ImgFolder="Sports"
				withBtn={false}
				openInBlank={true}
			/>
			<span className="straightBorder"></span>
			{langId === "en" ? (
				<img src={Rebate_EN} alt="Daily Rebate Unlimited" />
			) : (
				<img src={Rebate_VN} alt="Daily Rebate Unlimited" />
			)}
		</div>
	);
};
