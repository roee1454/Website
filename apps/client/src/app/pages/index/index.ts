import { Component } from "@angular/core";
import { HeroComponent } from "../../components/sections/index/hero/hero";
import { FeaturedProjectsComponent } from "@/app/components/sections/index/featured-projects/featured-projects";

@Component({
    imports: [HeroComponent, FeaturedProjectsComponent],
    selector: "app-index",
    templateUrl: "index.html"
})

export class Index { };