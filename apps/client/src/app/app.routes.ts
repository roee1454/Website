import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent } from './pages/about/about';
import { ResumeComponent } from './pages/resume/resume';

export const routes: Routes = [
    { path: "", loadComponent: () => Index },
    { path: 'projects', loadComponent: () => ProjectsComponent },
    { path: 'about', loadComponent: () => AboutComponent },
    { path: "resume", loadComponent: () => ResumeComponent }
];
