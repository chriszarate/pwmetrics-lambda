const isLambda = require('is-lambda');
const { chromeFlags, chromePath } = require('./lambda-config');

// Make sure we include Chrome flags needed for the Lambda environment.
const mergeChromeFlags = flags => {
	if (!flags.chromeFlags) {
		return chromeFlags;
	}

	const mergedFlags = new Set([...flags.chromeFlags, ...chromeFlags]);
	return [...mergedFlags];
};

// Make sure the chromePath points to the serverless-chrome binary.
const mergePWFlags = (flags = {}) => {
	const lambdaDefaults = {
		chromeFlags: mergeChromeFlags(flags),
		chromePath,
	};

	return Object.assign({}, flags, lambdaDefaults);
};

const mergeOptions = (options = {}) => {
	if (!isLambda) {
		return options;
	}

	options.flags = mergePWFlags(options.flags);
	return options;
};

module.exports = mergeOptions;
