import React from "react";

export default ({ t, step, defStep, className }) => {
	let rows = defStep.map((s, sIdx) => {
		return (
			<div
				className={sIdx <= step - 1 ? "active" : ""}
				key={`step-${sIdx}`}>
				<span>{t(s.descriptionKey)}</span>
			</div>
		);
	});

	return <div className={className ? className : "stepBar"}>{rows}</div>;
};
