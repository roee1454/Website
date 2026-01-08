import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideIcons } from '@ng-icons/core'
import { routes } from './app.routes'
import { lucideLinkedin, lucideGithub, lucideArrowRight, lucideStars, lucideLoader2, lucideStar, lucideGitFork, lucideExternalLink, lucideFolder, lucideTag, lucideInfo, lucideCamera, lucideMenu, lucideX, lucidePalette, lucideMail, lucideChevronUp, lucideChevronDown, lucideCalendar, lucideFileText, lucidePhone } from '@ng-icons/lucide'
import { simpleAngular, simpleTypescript, simpleTailwindcss, simpleNextdotjs, simpleNodedotjs, simplePostgresql, simpleNestjs } from '@ng-icons/simple-icons'
import { provideQueryClient } from '@ngneat/query'
import { QueryClient } from "@tanstack/query-core"
import { AXIOS_CLIENT, client } from './services/axios.service';


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: AXIOS_CLIENT, useValue: client },
    provideBrowserGlobalErrorListeners(),
    provideQueryClient(() => new QueryClient()),
    provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
    provideIcons({
      lucideGithub, lucideLinkedin, lucideArrowRight, lucideStars, lucideLoader2, lucideStar, lucideGitFork, lucideExternalLink, lucideFolder, lucideTag, lucideInfo, lucideCamera, lucideMenu, lucideX, lucidePalette, lucideMail, lucideChevronUp, lucideChevronDown, lucideCalendar, lucideFileText, lucidePhone,
      simpleAngular, simpleTypescript, simpleTailwindcss, simpleNextdotjs, simpleNodedotjs, simplePostgresql, simpleNestjs
    }),
  ]
};

