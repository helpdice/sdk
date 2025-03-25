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
	gender?: string;
	username?: string;
	image_url?: string;
	name?: string;
	token?: string;
	today?: Date;
}

export type { AuthRequest, AuthRequestParams, SignupRequest };
