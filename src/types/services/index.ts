export interface IParams {
    [key: string]: any;
}

export interface IGenericOptions {
    url: string;
    params?: IParams;
}

export interface IErrorResponse {
    status: string;
    message: string;
    error: any;
    success: boolean;
}