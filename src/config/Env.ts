// import { createEnv } from '@t3-oss/env-nextjs';
import { z } from "zod";

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = {
	server: {
		ARCJET_KEY: z.string().startsWith("ajkey_").optional(),
		CLERK_SECRET_KEY: z.string().min(1),
		DATABASE_URL: z.string().optional(),
		LOGTAIL_SOURCE_TOKEN: z.string().optional(),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().optional(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
	},
	shared: {
		NODE_ENV: z.enum(["test", "development", "production"]).optional(),
	},
	// You need to destructure all the keys manually
	runtimeEnv: {
		ARCJET_KEY: process.env.ARCJET_KEY,
		API_URL: process.env.REACT_APP_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
		HELPDICE_API_KEY:
			process.env.REACT_APP_HELPDICE_API_KEY ??
			process.env.NEXT_PUBLIC_HELPDICE_API_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NODE_ENV: process.env.NODE_ENV,
		LOGIN_URL:
			process.env.REACT_APP_LOGIN_URL ?? process.env.NEXT_PUBLIC_LOGIN_URL,
	},
	firebase: {
		FIREBASE_API_KEY:
			process.env.REACT_APP_FIREBASE_API_KEY ??
			process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN:
			process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ??
			process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID:
			process.env.REACT_APP_FIREBASE_PROJECT_ID ??
			process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET:
			process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ??
			process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID:
			process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ??
			process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID:
			process.env.REACT_APP_FIREBASE_APP_ID ??
			process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		FIREBASE_MEASUREMENT_ID:
			process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ??
			process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	},
};
