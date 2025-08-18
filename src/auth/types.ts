interface AuthRequest {
	email?: string;
	password?: string;
	username?: string;
	token?: string;
}

type AuthRequestParams = unknown;

interface SignupRequest extends AuthRequest {
	provider?: string;
	uid?: string;
	contact?: string;
	gender?: string;
	username?: string;
	image_url?: string;
	name?: string;
	token?: string;
	apiKey?: boolean;
	today?: Date;
}

export type { AuthRequest, AuthRequestParams, SignupRequest };
