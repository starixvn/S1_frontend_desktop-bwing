import React from "react";
import SwipperBanner from "../common/swipperBanner";

export default () => {
	return (
		<div className="offers">
			<div>
				<SwipperBanner
					ImgFolder="Sports"
					withBtn={true}
					openInBlank={true}
				/>
			</div>
			<span className="straightBorder"></span>
			<img
				src={require("../../styles/img/off2.jpg")}
				alt="cash back offer"
			/>
		</div>
	);
};
