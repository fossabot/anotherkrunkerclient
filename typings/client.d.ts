import { Saveables } from '@settings-backend';

export type EventListener = (eventId: string, data?: unknown) => void;
export type KrunkerDomains = 'krunker.io' | 'browserfps.com';

export type InputNodeAttributes<Target extends HTMLElement> = {
	id: Saveables;
} & Partial<Target>;

export type Callback = (...args: never[]) => unknown;

export type AsyncReturnType<Target extends (...args: unknown[]) => Promise<unknown>> = Awaited<ReturnType<Target>>;

export type RequiredFieldsOnly<T> = {
	[K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
export type UnrequiredFieldsOnly<T> = {
	[K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

declare global {
	namespace NodeJS {
		interface Global {
			resourceswapProtocolSource: string;
		}
	}
	export interface Window {
		closeClient: () => null;
	}
}

interface GitHubResponse {
	data?: {
		tag_name: string;
		html_url: string;
	}
}

export interface ReleaseData {
	clientVersion: string;
	releaseVersion: string,
	releaseUrl: string;
}

export interface WindowData {
	url: string | undefined,
	tab?: string,
	isInTabs: boolean,
	isKrunker: boolean,
	quickJoin: boolean,
	invalid: boolean
}

export interface WindowSaveData {
	x: number;
	y: number;
	width: number;
	height: number;
	maximized: boolean;
	fullscreen: boolean;
}

export type DefaultConstructorOptions = Electron.BrowserWindowConstructorOptions & WindowSaveData;

export type SimplifiedTwitchMessage = {
	username: string;
	message: string;
	color?: string;
};

export interface PartialGPU {
	gpuDevice: {
		active: boolean;
		vendorId: number;
		deviceId: number;
	}[];
}

export type Flags = ([string] | [string, string])[];

export type Author = string | {
	name: string;
	email?: string;
};
