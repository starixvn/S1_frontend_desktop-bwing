import React from "react";
import { number_format } from "../common/common";
import PropTypes from "prop-types";
import ReloadSpin from "../common/reloadSpin";

const ShowWallet = props => {
	let arr = props.getWalletInfo.map((item, idx) => {
		return (
			<div className="walletBalanceModule" key={`wallets-${item.id}`}>
				<span className="icon icon-balance">
					{props.i18n(item.displayKey)}
				</span>
				<span>{number_format(item.balance, false)}</span>
				<div className="btnGroup">
					<button
						className="btn-check"
						onClick={props.restoreAll.bind(this, idx)}>
						{props.i18n("lbl_RestoreAll")}
					</button>
				</div>
			</div>
		);
	});
	return (
		<>
			<div className="walletModule">
				{arr}
				<ReloadSpin func={props.GetWalletInfo} />
			</div>
			<div className="tip active">
				{props.i18n("lbl_restore_all_hint")}
			</div>
		</>
	);
};

export default ShowWallet;

ShowWallet.propTypes = {
	getWalletInfo: PropTypes.array.isRequired,
	i18n: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	restoreAll: PropTypes.func.isRequired,
	GetWalletInfo: PropTypes.func.isRequired
};
