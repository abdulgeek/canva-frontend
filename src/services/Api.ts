/* eslint-disable @typescript-eslint/no-explicit-any */
/** Importing Libraries **/
import axios from "axios";

/** Importing Dependencies **/
import { minimalToast } from "../utils/minimalToast";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}` as string;

export const api = {
    user: {
        register: async (body: any) => {
            try {
                const data = await axios.post(
                    `${baseUrl}/user/register`, body
                );
                console.log("axios register", data.data);
                minimalToast(data.data.message, "success");
                return data.data;
            } catch (error: any) {
                console.log("axios error", error);
            }
        },
        login: async (body: any) => {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                }
            }
            try {
                const data = await axios.post(
                    `${baseUrl}/user/login`, body, config
                );
                console.log("axios login", data.data);
                minimalToast(data.data.message, "success");
                return data.data;
            } catch (error: any) {
                console.log("axios error", error);
            }
        },
        getAuthdetails: async (token: any) => {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                    'Authorization': `Bearer ${token}`,
                }
            }
            try {
                const data = await axios.get(
                    `${baseUrl}/user/user-details`,
                    config
                );
                console.log("axios user details", data.data);
                return data.data;
            } catch (error: any) {
                console.log("axios error", error);
            }
        },
    },
    design: {
        createUserDesign: async (body: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.post(
                    `${baseUrl}/design/create-user-design`, body, config
                );
                console.log("axios create user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getUserDesign: async (design_id: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/user-design/${design_id}`, config
                );
                console.log("axios get user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        updateUserDesign: async (design_id: any, body: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.put(
                    `${baseUrl}/design/update-user-design/${design_id}`, body, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        addUserImage: async (body: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.post(
                    `${baseUrl}/design/add-user-image`, body, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getUserImage: async (token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/get-user-image`, config
                );
                console.log("axios user image design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getUserDesignImage: async (token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/design-image`, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getBackgrounImage: async (token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/background-images`, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getAllUserDesign: async (token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/user-designs`, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        deleteUserImage: async (design_id: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.put(
                    `${baseUrl}/design/delete-user-image/${design_id}`, null, config
                );
                console.log("axios delete user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getTemplateById: async (template_id: any, token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/add-user-template/${template_id}`, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
        getTemplate: async (token: any) => {
            try {
                const config = {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_CLIENT_URL,
                        'Authorization': `Bearer ${token}`,
                    }
                }
                const data = await axios.get(
                    `${baseUrl}/design/templates`, config
                );
                console.log("axios update user design", data.data);
                return data.data;
            } catch (error) {
                console.log("axios error", error);
            }
        },
    }
}