import { Component, signal, inject } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { NgOptimizedImage } from '@angular/common';
import { SocialLinkComponent } from '@/app/components/ui/typography/social-link/social-link';
import { TextLink } from '@/app/components/ui/typography/text-link/text-link';
import { ThemeService } from '@/app/services/theme.service';
import { Social } from '@/app/types';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [NgIconsModule, SocialLinkComponent, TextLink, NgOptimizedImage],
  templateUrl: `about-hero.html`,
})
export class AboutHeroSection {
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

  protected isHovered = signal(false);
  protected hasSwapped = signal(false);
  protected isGlitching = signal(false);
  protected glitchColors = signal({ r: '', g: '', b: '' });

  private hoverTimer: any;
  private readonly HOVER_DURATION = 2000; // 2 seconds
  private themeService = inject(ThemeService);

  onMouseEnter() {
    if (this.hasSwapped()) return;

    this.isHovered.set(true);
    this.hoverTimer = setTimeout(() => {
      if (this.isHovered()) {
        // Start glitch
        const colors = this.themeService.getGlitchColors();
        this.glitchColors.set(colors);
        this.isGlitching.set(true);

        // Swap image mid-glitch
        setTimeout(() => {
          this.hasSwapped.set(true);
        }, 250);

        // End glitch
        setTimeout(() => {
          this.isGlitching.set(false);
        }, 500);
      }
    }, this.HOVER_DURATION);
  }

  onMouseLeave() {
    this.isHovered.set(false);
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
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
}
