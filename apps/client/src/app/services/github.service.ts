import { GithubUserInfo } from "@portifolio/types";
import { inject, Injectable } from "@angular/core";
import { injectQuery } from "@ngneat/query";
import { AXIOS_CLIENT } from '@/app/services/axios.service'

@Injectable({ providedIn: "root" })
export class GithubService {
    #query = injectQuery();
    #http = inject(AXIOS_CLIENT);

    getUserInfo() {
        return this.#query({
            queryKey: ["projects"],
            queryFn: async () => {
                const response = await this.#http.get<GithubUserInfo>(`/github/me`);
                return response.data;
            }
        })
    }
}