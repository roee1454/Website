import { Component, input, signal, HostListener, ElementRef } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Experience } from "@/app/types";
import { NgIconsModule } from "@ng-icons/core";
@Component({
    selector: "app-experience-popover",
    templateUrl: "experience-popover.html",
    imports: [CommonModule, NgIconsModule, NgOptimizedImage]
})
export class ExperiencePopoverComponent {
    public experience = input.required<Experience>();
    public isPopoverOpen = signal(false);
    constructor(private elementRef: ElementRef) {}
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.isPopoverOpen() && !this.elementRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    }
    togglePopover() {
        this.isPopoverOpen.update(value => !value);
    }
    closePopover() {
        this.isPopoverOpen.set(false);
    }
    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
    }
}