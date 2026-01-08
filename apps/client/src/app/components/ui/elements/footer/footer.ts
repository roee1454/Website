import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [NgIconsModule],
    templateUrl: './footer.html',
})
export class FooterComponent {
    protected currentYear = new Date().getFullYear();
    protected sourceUrl = 'https://github.com/roee1454/Portifolio';

    protected socials = [
        {
            icon: 'lucideGithub',
            url: 'https://github.com/roee1454',
            label: 'GitHub'
        },
        {
            icon: 'lucideLinkedin',
            url: 'https://www.linkedin.com/in/roee-heily-5176872a6/',
            label: 'LinkedIn'
        },
        {
            icon: 'lucideMail',
            url: 'mailto:roee1454@gmail.com',
            label: 'Email'
        },
        {
            icon: 'lucidePhone',
            url: 'tel:0527051611',
            label: 'Phone'
        }
    ];
}
