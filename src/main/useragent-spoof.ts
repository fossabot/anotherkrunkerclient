import PatchedStore from '@store';
import { USERAGENT_LIFETIME } from '@constants';
import { info } from '@logger';

const storeSchema = 'userAgentSpoof';
const store = new PatchedStore();

/**
 * Get the current operating system and return it in a format matching a UA.
 *
 * @returns The operating system as it would appear in a user agent string
 */
const getCurrentUAOS = (): string => {
	switch (process.platform) {
		case 'darwin':
			return 'Mac';
		case 'linux':
			return 'Linux';
		case 'win32':
		default:
			return 'Win';
	}
};

/**
 * Get the saved user agent.
 * 
 * If its time to refresh the user agent, reset it in store and return null.
 *
 * @returns The spoofed user agent, if any
 */
const getCurrentUA = (): string | null => {
	const lastSet = store.get(`${ storeSchema }.set`, Date.now());
	if (Date.now() - Number(lastSet) > USERAGENT_LIFETIME) store.delete(`${ storeSchema }.userAgent`);

	return store.get(`${ storeSchema }.userAgent`, null) as string | null;
};

/**
 * Iterate over an array of top user agents and get the best match for the current OS.
 *
 * @param userAgents The user agents to choose from
 * @returns User agent to use
 */
const iterateOverUAs = (userAgents: unknown): string => {
	if (Array.isArray(userAgents)) {
		let [bestUserAgent] = userAgents as string[];
		const currentOS = getCurrentUAOS();

		for (const userAgent of userAgents) {
			if (userAgent.includes(currentOS) && userAgent.includes('Chrome')) {
				bestUserAgent = userAgent;
				break;
			}
		}

		return bestUserAgent;
	}

	// Fallback user agent
	return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
};

/**
 * Get a spoofed user agent from the top-user-agents package corresponding to the user operating system.
 *
 * @returns The spoofed user agent string or null if no spoofed user agent is found
 */
export const getSpoofedUA = async(): Promise<(string | null)> => {
	// Check for a cached spoofed UA.
	const currentUA = getCurrentUA();

	// If there is no cached UA or it's been more than a month, generate a new one
	if (!currentUA) {
		info('Generating a new spoofed user agent');

		// Get the top user agents.
		const UserAgents = await import('top-user-agents');
		const bestUserAgent = iterateOverUAs(UserAgents);

		// Cache in store
		store.set(`${ storeSchema }.userAgent`, bestUserAgent);
		store.set(`${ storeSchema }.set`, Date.now());
		return bestUserAgent;
	}

	return String(currentUA);
};
