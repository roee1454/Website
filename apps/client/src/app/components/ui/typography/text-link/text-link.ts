import { Component, input } from "@angular/core";

@Component({
    imports: [],
    selector: "text-link",
    templateUrl: "text-link.html"
})

export class TextLink {
    content = input.required<string>();
    url = input.required<string>();
}