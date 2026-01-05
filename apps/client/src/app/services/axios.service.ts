import { InjectionToken } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../environments/environment.dev';

export const AXIOS_CLIENT = new InjectionToken<AxiosInstance>('AXIOS_CLIENT');

export const client = axios.create({ 
    baseURL: environment.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});