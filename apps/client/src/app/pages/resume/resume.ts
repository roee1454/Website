import { Component, inject } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    imports: [],
    selector: "app-resume",
    templateUrl: "resume.html",

})
export class ResumeComponent {
    private sanitizer = inject(DomSanitizer);

    protected resumeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        "/resources/cv.pdf"
    );
}