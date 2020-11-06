import React, { lazy } from "react";
import { useTranslation } from "react-i18next";

export default props => {
	const { t } = useTranslation();
	return (
		<div className="subModuleList kycHeight">
			<div className="subModule">
				<div className="subModuleBody column align-items-center">
					<img src={require("../../styles/img/gear.png")} />

					<div className="txt-lightgray">
						{/* <div className="icon icon-icon32px_worker"></div> */}
						<div className="title txt-org">{t("lbl_WaitKYC")}</div>
						<div className="txt-lightgray">
							{t("lbl_WaitKYCHint")}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
