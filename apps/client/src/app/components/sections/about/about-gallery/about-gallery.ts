import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-about-gallery',
    standalone: true,
    imports: [NgIconsModule, NgOptimizedImage],
    templateUrl: `about-gallery.html`
})
export class AboutGallerySection { }
