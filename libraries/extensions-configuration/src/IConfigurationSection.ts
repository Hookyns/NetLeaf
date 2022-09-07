import { IConfiguration } from "./IConfiguration";

export type IConfigurationSection<T = any> = IConfiguration<T> & {
	readonly path: string;
	readonly value: T;
};