import IHostLifetime from "./IHostLifetime";

export default class HostLifetime implements IHostLifetime
{
	/**
	 * Construct HostLifetime
	 */
	constructor(logger: ILogger)
	{
		this.registerSigListeners();
	}

	/**
	 * @inheritDoc
	 */
	on(event: "started" | "stopping" | "stopped"): IHostLifetime
	{
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	stop(): void
	{
		
	}

	/**
	 * Register listeners for SIG* events.
	 * @private
	 */
	private registerSigListeners()
	{
		process.on("SIGTERM", signal => this.handleSignal(signal));
		process.on("SIGINT", signal => this.handleSignal(signal));
	}

	/**
	 * Handle SIGx.
	 * @param signal
	 * @private
	 */
	private handleSignal(signal: NodeJS.Signals)
	{
		this.stop();
	}
}