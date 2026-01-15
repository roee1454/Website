import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './skills.html',
})
export class SkillsSectionComponent {
  public isOpen = signal(false);
  protected isTyping = signal(false);
  protected showContent = signal(false);

  protected skillsCategories = [
    {
      name: 'skills',
      items: 'Linux Environments, Web Dev, Android Dev, Image & Video Processing',
    },
    {
      name: 'Languages',
      items: 'C++, Python, TypeScript, JavaScript, Kotlin, SQL',
    },
    {
      name: 'Frameworks & Runtimes',
      items: 'React, React Native, Angular, Jetpack Compose, Nest.js, Node.js, Flask',
    },
    {
      name: 'Databases',
      items: 'PostgreSQL, MySQL, Redis, Firebase',
    },
    {
      name: 'Computer Vision',
      items: 'OpenCV, FFmpeg, GStreamer, NumPy',
    },
    {
      name: 'Devops & Deployment',
      items: 'GitHub CI/CD, Docker, Nginx',
    },
  ];

  protected info = [
    { key: 'OS', value: 'Arch Linux x86_64' },
    { key: 'Shell', value: 'bash 5.2.21' },
    { key: 'Title', value: 'Software Developer' },
    { key: 'Experience', value: this.calculateExperience(new Date('2023-08-08')) },
  ];

  private calculateExperience(startDate: Date): string {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    // Round up to the nearest 0.1 to match user's professional experience estimation
    return (Math.ceil(diffYears * 10) / 10).toFixed(1) + ' Years';
  }

  open() {
    this.isOpen.set(true);
    this.isTyping.set(true);
    this.showContent.set(false);

    // Simulate typing neofetch
    setTimeout(() => {
      this.isTyping.set(false);
      this.showContent.set(true);
    }, 1750);
  }

  close() {
    this.isOpen.set(false);
  }
}
