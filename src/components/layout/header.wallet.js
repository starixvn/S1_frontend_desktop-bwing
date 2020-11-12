import React, {
	Component,
	createRef,
	useContext,
	useEffect,
	useRef
} from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../path";
import {
	walletInfoContext,
	userInfoContext,
	bonusWalletsContext
} from "../common/context";
import moment from "moment";
import { isConvert, number_format } from "../common/common";
import { api_account_SetHideBalance } from "../../service/api/account";

import ReloadSpin from "../common/reloadSpin";
import HeaderProcessBar from "./header.processBar";

export default props => {
	const { walletInfo, setWalletInfo, getContentWalletInfo } = useContext(
		walletInfoContext
	);
	const { bonusWallets } = useContext(bonusWalletsContext);
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const HandleDisplayBalance = (value, e) => {
		e.stopPropagation();
		setWalletInfo(prevS => ({ ...prevS, isHideBalance: value }));
		api_account_SetHideBalance({ value });
	};

	return userInfo.isLogin && userInfo.currencyId !== undefined ? (
		<Dropdown
			{...props}
			lastTransaction={walletInfo.lastTransaction}
			lastLogin={userInfo.lastLogin}
			currencyId={userInfo.currencyId}
			walletInfo={walletInfo}
			bonusWallets={bonusWallets}
			_isConvert={isConvert(userInfo.currencyId)}
			getContentWalletInfo={getContentWalletInfo}
			HandleDisplayBalance={HandleDisplayBalance}
		/>
	) : (
		<></>
	);
};

class Dropdown extends Component {
	constructor(props) {
		super(props);
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	clickDropdown = e => {
		e.preventDefault();
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		let isHideBalance = this.props.walletInfo?.isHideBalance;
		let tpWalletsBonusSum = this.props.walletInfo?.tpWallets?.reduce(
			(prev, curr) => prev + curr.balance,
			0
		);

		let balance = isHideBalance
			? "*****"
			: this.props.walletInfo.main === null
			? 0
			: number_format(this.props.walletInfo.main + tpWalletsBonusSum);

		const tpWallets =
			this.props.walletInfo.tpWallets &&
			this.props.walletInfo.tpWallets.map(t => {
				return (
					<div key={`header-tpwallet-${t.tpId}`}>
						<span>{this.props.i18n(`lbl_TpWallet_${t.tpId}`)}</span>
						&nbsp;
						<span>{number_format(t.balance)}</span>
					</div>
				);
			});

		const bonusWallets = this.props.bonusWallets.map(item => {
			return (
				<div key={`header-bonuswallet-${item.tpId}`}>
					<span>
						{this.props.i18n(
							`lbl_BonusWallet_${item.promoCategoryId}`
						)}
					</span>
					&nbsp;
					<span>{number_format(item.bonus)}</span>
				</div>
				// <HeaderProcessBar
				// 	turnover={item.turnover}
				// 	rollover={item.rollover}
				// />
			);
		});

		return (
			<div
				className={`wallet icon icon-balance${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				<button>
					{this.props.currencyId === 51 ? "VNĐ" : "$"}&nbsp;
					{balance}
				</button>
				<button
					aria-label="HandleDisplayBalance"
					onClick={this.props.HandleDisplayBalance.bind(
						this,
						!isHideBalance
					)}
					className={`icon icon-eye${
						isHideBalance ? "-blocked" : ""
					}`}></button>
				<i className="icon icon-arrow_drop_down"></i>
				<div className="submenu">
					<div className="walletBalance">
						<div>
							<div>
								<span>{`${this.props.i18n(
									"lbl_MainWallet"
								)}`}</span>
								&nbsp;
								<span>
									{number_format(this.props.walletInfo.main)}
								</span>
							</div>
							{bonusWallets}
							{tpWallets}
						</div>

						<ReloadSpin func={this.props.getContentWalletInfo} />
					</div>
					<div className="btnGroup">
						<Link
							to={`${this.props.langId}/${path.deposit.root}`}
							className="blue">
							{this.props.i18n("lbl_Deposit")}
						</Link>
						<Link
							to={`${this.props.langId}/${path.transferFunds.root}`}
							className="blue">
							{this.props.i18n("lbl_TransferFunds")}
						</Link>
					</div>
					<div className="loginLog">
						<span>{this.props.i18n("lbl_LastLogin")}</span>
						<span>
							{this.props.lastLogin
								? moment(this.props.lastLogin).format("l LTS")
								: null}
						</span>
					</div>
					<div className="transactionLog">
						<span>{this.props.i18n("lbl_LastTransaction")}</span>
						<span>
							{this.props.lastTransaction
								? moment(this.props.lastTransaction).format(
										"l LTS"
								  )
								: null}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	i18n: PropTypes.func.isRequired
};
