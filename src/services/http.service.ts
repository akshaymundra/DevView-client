import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { IService, EHttpMethod } from "@/types";
import nProgress from "nprogress";
import toast from "react-hot-toast";


class HttpService {
    private http: AxiosInstance;
    private baseUrl = 'http://localhost:5000/api/';


    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl,
            withCredentials: false,
            headers: this.setupHeaders(),
        });
    }

    private get getAuthorization() {
        const accessToken = Cookies.get('accessToken');
        return accessToken ? { Authorization: accessToken } : {};
    }

    // initial service configuration
    public service(
        showAlert = false
    ) {
        this.injectInterceptors(showAlert);
        return this;
    }

    // set up request headers 
    private setupHeaders(hasAttachment = false) {
        return hasAttachment
            ? { 'Content-Type': 'multipart/form-data', ...this.getAuthorization }
            : { 'Content-Type': 'application/json', ...this.getAuthorization }
    }

    // handle http request
    private async request<T>(
        method: EHttpMethod,
        url: string,
        options: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.http.request<T>({
                method,
                url,
                ...options,
            });

            return response.data;

        } catch (error) {
            return this.normalizeError(error);
        }
    }

    // perform get request 
    public async get<T>(
        url: string,
        params?: IService.IParams,
        hasAttachment = false,
    ): Promise<T> {
        return this.request<T>(EHttpMethod.GET, url, {
            params,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // perform post request 
    public async push<T, P>(
        url: string,
        payload: P,
        params?: IService.IParams,
        hasAttachment = false,
    ): Promise<T> {
        return this.request<T>(EHttpMethod.POST, url, {
            params,
            data: payload,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // perform update 
    public async update<T, P>(
        url: string,
        payload: P,
        params?: IService.IParams,
        hasAttachment = false,
    ): Promise<T> {
        return this.request<T>(EHttpMethod.PUT, url, {
            params,
            data: payload,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // Perform DELETE request
    public async remove<T>(
        url: string,
        params?: IService.IParams,
        hasAttachment = false
    ): Promise<T> {
        return this.request<T>(EHttpMethod.DELETE, url, {
            params,
            headers: this.setupHeaders(hasAttachment),
        });
    }

    // Inject interceptors for request and response
    private injectInterceptors(showAlert: boolean) {
        // Set up request interceptor
        this.http.interceptors.request.use((request) => {
            // * Perform an action
            nProgress.start();
            return request;
        });

        // Set up response interceptor
        this.http.interceptors.response.use(
            (response) => {
                nProgress.done();

                if (showAlert) {
                    toast.success("");
                }

                return response;
            },

            (error) => {
                if (showAlert) {
                    toast.error(error.response.data.message);
                }
                nProgress.done();
                return Promise.reject(error);
            }
        );
    }

    // Normalize errors
    private normalizeError(error: any) {
        return Promise.reject(error);
    }
}


export { HttpService };