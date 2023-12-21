/* eslint-disable @typescript-eslint/no-explicit-any */
/** importing libraries **/
import axios from "axios";
import { jwtDecode } from "jwt-decode";

/** importing dependencies **/
import { ILocalStorage } from "../interfaces/interface";
import { store } from "../redux/store";
import { minimalToast } from "./minimalToast";
import { loaduser } from "../redux/auth/auth.slice";

class AuthUtils {
    static setLocalStorage<T extends keyof ILocalStorage>(
        key: T,
        value: ILocalStorage[T]
    ): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getLocalStorage<T extends keyof ILocalStorage>(
        key: T
    ): ILocalStorage[T] | null {
        const value = localStorage.getItem(key);

        if (value) {
            return JSON.parse(value);
        }

        return null;
    }

    static removeLocalStorage<T extends keyof ILocalStorage>(key: T): void {
        localStorage.removeItem(key);
    }

    static setAuthToken(): void {
        const token = this.getLocalStorage("access_token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    static async authorize(_store: typeof store): Promise<void> {
        const token = this.getLocalStorage("access_token");
        let userId;

        if (token) {
            const decodedToken = jwtDecode<{ _id: string }>(token);
            if ("_id" in decodedToken) {
                userId = decodedToken._id;
            }
        }

        try {
            if (token && userId) {
                _store.dispatch(loaduser());
            } else {
                return;
            }
        } catch (error: any) {
            minimalToast(error.message, "error")
        }
    }
}

export default AuthUtils;
