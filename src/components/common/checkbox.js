import React from "react";

export default props => {
	return (
		<div className="agree">
			<div className="checkbox">
				<input
					type="checkbox"
					id={props.id}
					checked={props.checked}
					onChange={props.onChange}
				/>
				<label
					className="icon icon-checkmark"
					htmlFor={props.id}></label>
			</div>
			<div>{props.children}</div>
		</div>
	);
};
