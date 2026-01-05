import { Component } from "@angular/core";
import { TextLink } from "../../../ui/typography/text-link/text-link";
import { SocialLinkComponent } from "../../../ui/typography/social-link/social-link";
import { Social } from "@/app/types";
import { NgIconsModule } from "@ng-icons/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-hero-component",
    imports: [TextLink, SocialLinkComponent, NgIconsModule, RouterLink],
    templateUrl: "hero.html"
})

export class HeroComponent {
    protected socials = [
        {
            icon: "lucideGithub",
            text: "Github",
            url: "https://github.com/roee1454"
        },
        {
            icon: "lucideLinkedin",
            text: "LinkedIn",
            url: "https://www.linkedin.com/in/roee-heily-5176872a6/"
        }
    ] satisfies Social[]
}