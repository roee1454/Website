import { Component, input } from "@angular/core";
import { NgIconsModule } from '@ng-icons/core';

@Component({
    imports: [NgIconsModule],
    templateUrl: "social-link.html",
    selector: "social-link"
})

export class SocialLinkComponent {
    url = input.required<string>();
    icon = input.required<string>();
    text = input.required<string>();
}