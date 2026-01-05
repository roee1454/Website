import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    imports: [RouterLink],
    selector: "route-link",
    templateUrl: "route-link.html"
})

export class RouteLink {
    content = input.required<string>();
    url = input.required<string>();
}
