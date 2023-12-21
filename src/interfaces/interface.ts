export interface ILocalStorage {
	access_token: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface InitialState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

export interface UserDetails {
	name: string;
	email: string;
	password: string;
}

export interface IAuthState {
	access_token: string | undefined | null;
	user: IApiUser | undefined | null;
	isAuthenticated: boolean;
}

export interface ISignupDetails {
	email: string;
	password: string;
	name: string;
}

export interface IApiUser {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	isOwner: boolean;
	adminFeaturesAllowed: []
}

export interface IAuthResponse {
	role: string;
	token: string;
	user: IApiUser;
}

export interface ILocalStorage {
	access_token: string;
}
