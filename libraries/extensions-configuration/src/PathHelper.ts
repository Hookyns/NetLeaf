export const KeySplitChar = ".";

/**
 * Combine path with key
 * @param path
 * @param key
 */
export function combine(path: string, key: string)
{
	if (!path)
	{
		return key;
	}

	if (!key)
	{
		return path;
	}

	return path + KeySplitChar + key;
}