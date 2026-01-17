import { Component } from '@angular/core';
import { AboutHeroSection } from '../../components/sections/about/about-hero/about-hero';
import { AboutGallerySection } from '../../components/sections/about/about-gallery/about-gallery';

@Component({
    selector: 'app-about',
    templateUrl: './about.html',
    standalone: true,
    imports: [AboutHeroSection]
})
export class AboutComponent { }