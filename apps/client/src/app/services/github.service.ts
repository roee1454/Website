import { GithubUserInfo } from '@portifolio/types';
import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { AXIOS_CLIENT } from '@/app/services/axios.service';

@Injectable({ providedIn: 'root' })
export class GithubService {
  #query = injectQuery();
  #http = inject(AXIOS_CLIENT);

  getUserInfo() {
    return this.#query({
      queryKey: ['projects'],
      queryFn: async () => {
        const response = await this.#http.get<GithubUserInfo>(`/github/me`);
        return response.data;
      },
    });
  }

  getRepoThumbnail(repoName: string) {
    return this.#query({
      queryKey: ['thumbnail', repoName],
      queryFn: async () => {
        const response = await this.#http.get(`/github/${repoName}/thumbnail`, {
          responseType: 'blob',
        });
        return URL.createObjectURL(response.data);
      },
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
      retryOnMount: false,
      gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour even if unmounted
    });
  }
}
