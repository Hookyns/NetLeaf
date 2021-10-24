/**
 * ServiceDescriptor guard
 * @param obj
 * @return {obj is ServiceDescriptor}
 * @private
 */
import {
    IServiceCollection,
    ServiceCollectionEntry,
    ServiceDescriptor
} from "@netleaf/extensions-dependency-injection-abstract";

export function isServiceDescriptor(obj: any): obj is ServiceDescriptor
{
    return obj && obj.hasOwnProperty("serviceIdentifier") && obj.hasOwnProperty("lifetime");
}

/**
 * ServiceCollectionEntry guard
 * @param obj
 * @return {obj is ServiceCollectionEntry}
 * @private
 */
export function isServiceCollectionEntry(obj: any): obj is ServiceCollectionEntry
{
    return obj && obj.hasOwnProperty("serviceIdentifier") && obj.hasOwnProperty("descriptors");
}

/**
 * IServiceCollection guard
 * @param obj
 * @return {obj is IServiceCollection}
 * @private
 */
export function isIServiceCollection(obj: any): obj is IServiceCollection
{
    return obj && obj.hasOwnProperty("services");
}