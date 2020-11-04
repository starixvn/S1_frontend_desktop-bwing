import React from "react";
import SwipperBanner from "../common/swipperBanner";

export default () => {
	return (
		<div className="offers">
			<SwipperBanner
				ImgFolder="Sports"
				withBtn={true}
				openInBlank={true}
			/>
			<span className="straightBorder"></span>
			<img
				src={require("../../styles/img/off2.jpg")}
				alt="cash back offer"
			/>
		</div>
	);
};
