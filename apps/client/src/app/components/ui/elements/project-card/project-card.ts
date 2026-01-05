import { Component, input } from "@angular/core";
import { NgIconsModule } from "@ng-icons/core";
import { CommonModule } from "@angular/common";
import { Project } from "@/app/types";

@Component({
    selector: "app-project-card",
    templateUrl: "project-card.html",
    imports: [NgIconsModule, CommonModule]
})

export class ProjectCardComponent {
    public project = input.required<Project>();
}