/* Calculate the rate based on the type of postage. */
exports.calculateRate = function (weight, mailType) {
	var rate;
	switch (mailType) {
		case "Letter (Stamped)":
			rate = getRateLS(weight * 1);
			break;
		case "Letter (Metered)":
			rate = getRateLM(weight * 1);
			break;
		case "Large Envelope (Flat)":
			rate = getRateLE(weight * 1);
			break;
		case "First-Class Package Service-Retail":
			rate = getRateFCPS(weight * 1);
			break;
		default:
			rate = 0;
			break;
	}
	if (weight <= 0)
		rate = 0;
	return "$" + rate.toFixed(2);
}

/* Rates for Stamped Letters */
function getRateLS (weight) {
	if (weight <= 1)
		return .5;
	else if (weight <= 2)
		return .71;
	else if (weight <= 3)
		return .92;
	else if (weight <= 3.5)
		return 1.13;
	else
		return .92 + (weight - 3) * .42;
}

/* Rates for Metered Letters */
function getRateLM (weight) {
	if (weight <= 1)
		return .47;
	else if (weight <= 2)
		return .68;
	else if (weight <= 3)
		return .89;
	else if (weight <= 3.5)
		return 1.10;
	else
		return .89 + (weight - 3) * .42;
}

/* Rates for Large Envelopes (Flats) */
function getRateLE (weight) {
	return 1 + Math.ceil(weight - 1) * .21;
}

/* Rates for First-Class Package Service */
function getRateFCPS (weight) {
	if (weight <= 8)
		return Math.ceil(weight / 4) * .25 + 3.25;
	else
		return (weight - 8) * .35 + 3.75;
}