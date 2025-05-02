/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL_API = "http://127.0.0.1:3000/api";

class CategoryAPI {
    baseUrl: string;

    constructor() {
        this.baseUrl = BASE_URL_API + "/categories";
    }

    async getAll(): Promise<any> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data;
    }
}

export default new CategoryAPI();
