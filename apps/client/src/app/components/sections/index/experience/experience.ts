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
            src: "/resources/icons/idf.png",
            title: "IDF - Hatal",
            past: false,
            position: "Software Developer",
            descirption: "Built real software solutions for the IDF, focusing on full-stack development, android development and computer vision.",
            from: new Date("2023-08-08"),
            to: new Date("2026-03-23"),
            siteUrl: "https://www.idf.il/%D7%90%D7%AA%D7%A8%D7%99-%D7%99%D7%97%D7%99%D7%93%D7%95%D7%AA/%D7%94%D7%97%D7%98%D7%99%D7%91%D7%94-%D7%94%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%AA-%D7%9C%D7%99%D7%91%D7%A9%D7%94/%D7%90%D7%95%D7%93%D7%95%D7%AA/"
        },
        {
            src: "/resources/icons/julius.jpg",
            title: "Julius Agency",
            past: true,
            position: "Software Developer",
            descirption: "Built applications using Next.js and React Native, deploying web and mobile products to production via Google Play & Firebase.",
            from: new Date("2024-02-02"),
            to: new Date("2024-12-31"),
            siteUrl: "https://julius-agency.co.il/he"
        }
    ]; 
}