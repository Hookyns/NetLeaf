let deasync: any;

export function resolveSync<TReturn = void>(promise: Promise<TReturn>): TReturn {
	if (!deasync) {
		deasync = require("deasync");
		
		if (!deasync) {
			throw new Error("Processing Promises in a synchronous manner is only possible in node environment with installed 'deasync' package.");
		}
	}

	let done = false;
	let value: any;

	promise.then(val => {
		value = val;
		done = true;
	});

	deasync.loopWhile(() => !done);
	
	return value;
}