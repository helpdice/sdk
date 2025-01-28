interface AuthRequest {
	email?: string;
	password?: string;
	username?: string;
	token?: string;
}

type AuthRequestParams = unknown;

interface SignupRequest extends AuthRequest {
	gender?: string;
	username?: string;
	image_url?: string;
	name?: string;
	token?: string;
}

export type { AuthRequest, AuthRequestParams, SignupRequest };
