import { Component, ViewChild } from '@angular/core';
import { TextLink } from '../../../ui/typography/text-link/text-link';
import { SocialLinkComponent } from '../../../ui/typography/social-link/social-link';
import { Social } from '@/app/types';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { ExperienceComponent } from '../experience/experience';
import { SkillsSectionComponent } from '../skills/skills';
import { TerminalTriggerComponent } from '../../../ui/elements/terminal-trigger/terminal-trigger';

@Component({
  selector: 'app-hero-component',
  imports: [
    TextLink,
    SocialLinkComponent,
    NgIconsModule,
    RouterLink,
    ExperienceComponent,
    SkillsSectionComponent,
    TerminalTriggerComponent,
  ],
  templateUrl: 'hero.html',
})
export class HeroComponent {
  @ViewChild(SkillsSectionComponent) skillsModal!: SkillsSectionComponent;

  protected age = this.calculateAge(new Date(2004, 9, 1));

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  protected socials = [
    {
      icon: 'lucideGithub',
      text: 'Github',
      url: 'https://github.com/roee1454',
    },
    {
      icon: 'lucideLinkedin',
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/roee-heily-5176872a6/',
    },
    {
      icon: 'lucideMail',
      text: 'Email',
      url: 'mailto:roee1454@gmail.com',
    },
    {
      icon: 'lucideFileText',
      text: 'Resume',
      url: '/resources/cv.pdf',
    },
  ] satisfies Social[];

  openSkills() {
    this.skillsModal.open();
  }
}
