import { Component } from "@angular/core";
import { ExperiencePopoverComponent } from "../../../ui/elements/experience-popover/experience-popover";
import { Experience } from "@/app/types";
@Component({
    selector: "app-experience",
    templateUrl: "experience.html",
    imports: [ExperiencePopoverComponent]
})
export class ExperienceComponent {
    protected experiences: Experience[] = [
        {
            src: "/resources/idf-logo.png",
            title: "IDF",
            past: false,
            position: "Software Developer",
            descirption: "Developing cutting-edge software solutions for military applications, focusing on full-stack development and system architecture.",
            from: new Date("2023-01-01"),
            to: new Date(),
            siteUrl: "https://www.idf.il"
        },
        {
            src: "/resources/tech-company-logo.png",
            title: "Tech Startup",
            past: true,
            position: "Junior Developer",
            descirption: "Worked on building scalable web applications using modern frameworks and contributed to the development of core features.",
            from: new Date("2021-06-01"),
            to: new Date("2022-12-31"),
            siteUrl: "https://example.com"
        }
    ];
}