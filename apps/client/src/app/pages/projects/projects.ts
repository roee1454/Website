import { Component } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";
import { ProjectsListSection } from "@/app/components/sections/projects/projects-list/projects-list";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.html",
  standalone: true,
  imports: [NgIconsModule, ProjectsListSection],
})
export class ProjectsComponent { }
