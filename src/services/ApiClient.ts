import { ApiError } from "./ApiError.js";

export class ApiClient<T> {

    async get(url: string): Promise<T> {

        const response = await fetch(url);

        if (!response.ok) {
            throw new ApiError(
                response.status,
                response.statusText
            );
        }

        const data = await response.json();

        return data as T;
    }
}