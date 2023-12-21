/* eslint-disable @typescript-eslint/no-explicit-any */
/** importing dependencies **/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/** importing libraries **/
import { IAuthResponse, IAuthState } from '../../interfaces/interface';
import { api } from "../../services/Api";
import AuthUtils from "../../utils/auth.utils";
import { RootState } from "../store";
import { minimalToast } from "../../utils/minimalToast";

export type ISigninDetails = {
	email: string;
	password: string;
};

export type ISignupDetails = {
	email: string;
	name: string;
	password: string;
};

export const SERVER_URI = import.meta.env.VITE_SERVER_URL;

const initialState: IAuthState = {
	access_token: AuthUtils.getLocalStorage("access_token"),
	user: null,
	isAuthenticated: false,
};

/**
 * @description - To load user using token in local storage on page refresh or fresh page visit
 */
const loaduser = createAsyncThunk(
	"auth/loaduser",
	async (_, { dispatch, getState }) => {
		try {
			const { access_token } = (getState() as RootState).auth;

			const data = await api.user.getAuthdetails(access_token);
			dispatch(success(data));
		} catch (err: any) {
			console.log(err);
		}
	}
);

/**
 * @description - To register a new user
 */

const register = createAsyncThunk(
	"auth/register",
	async (details: ISignupDetails, { dispatch }) => {
		try {
			const data = await api.user.register(details);

			if (!data.data) {
				minimalToast("Something went wrong. Please try again later.", "error");
			}
			dispatch(registerSuccess(data));
			return data;
		} catch (err: any) {
			console.log(err);
		}
	}
)

/**
 * @description - To login user
 */
const login = createAsyncThunk(
	"auth/login",
	async (details: ISigninDetails, { dispatch }) => {
		try {
			const data = await api.user.login(details)

			if (!data.data || !data.data?.token) {
				minimalToast("Something went wrong. Please try again later.", "error");
			}
			dispatch(success(data));
			return data;
		} catch (err: any) {
			console.log("error", err);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		/**
		 * Logout user
		 */
		logout: (state) => {
			AuthUtils.removeLocalStorage("access_token");
			AuthUtils.setAuthToken();
			Object.assign(state, initialState, { access_token: null });
		},

		/**
		 * Handle Auth Error
		 */
		error: (state) => {
			AuthUtils.removeLocalStorage("access_token");
			AuthUtils.setAuthToken();

			Object.assign(state, initialState, { access_token: null });
		},

		/**
		 * Handle Auth Request Success
		 */
		success: (state, { payload }: { payload: { data: IAuthResponse } }) => {
			AuthUtils.setLocalStorage("access_token", payload.data.token);
			AuthUtils.setAuthToken();
			state.access_token = payload.data.token;
			state.isAuthenticated = true;
			state.user = payload.data as any;
		},
		/**
		 * Handle Auth Register Success
		 */
		registerSuccess: (state, { payload }: { payload: { data: any } }) => {
			state.access_token = null;
			state.user = payload.data;
			state.isAuthenticated = false;
		},
	},
});

const {
	error,
	logout,
	success,
	registerSuccess,
} = authSlice.actions;

export function getAuthState(state: RootState): IAuthState {
	return state.auth;
}

export {
	error,
	login,
	loaduser,
	logout,
	register,
	success,
};

export const authReducer = authSlice.reducer;
