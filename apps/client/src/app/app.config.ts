import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core'
import { routes } from './app.routes'
import { lucideLinkedin, lucideGithub, lucideArrowRight, lucideStars, lucideLoader2, lucideStar, lucideGitFork, lucideExternalLink, lucideFolder } from '@ng-icons/lucide'
import { provideQueryClient } from '@ngneat/query'
import { QueryClient } from "@tanstack/query-core"
import { AXIOS_CLIENT, client } from './services/axios.service';


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AXIOS_CLIENT, useValue: client },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({ lucideGithub, lucideLinkedin, lucideArrowRight, lucideStars, lucideLoader2, lucideStar, lucideGitFork, lucideExternalLink, lucideFolder }),
    provideQueryClient(() => new QueryClient())
  ]
};

