import React from "react";

export default ({ btnBar, message, message2 }) => {
	return (
		<div className="Success active">
			<div className="icon icon-icon32px_notification"></div>
			<div className="title">Oh</div>
			<div className="txt-lightgray">
				{message}
				<br />
				{message2}
			</div>
			{btnBar}
		</div>
	);
};
