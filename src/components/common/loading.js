import React from "react";
import LoadingImg from "../../styles/img/loading_star.png";

export default () => {
	return (
		<div className="loading">
			<div>
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
			</div>
		</div>
	);
};
