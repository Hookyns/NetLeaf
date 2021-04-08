/**
 * Lifetime object of the hosted application.
 */
export default interface IHostLifetime {
    /**
     * Bind event handler to the lifetime object.
     * @param event
     * @description
     * started - triggered when the application host has fully started.
     * stopping - triggered when the application host is performing a graceful shutdown. Shutdown will block until this event completes.
     * stopped - triggered when the application host is performing a graceful shutdown. Shutdown will block until this event completes.
     */
    on(event: "started" | "stopping" | "stopped"): IHostLifetime;
    /**
     * Requests termination of the current application.
     */
    stop(): void;
}
