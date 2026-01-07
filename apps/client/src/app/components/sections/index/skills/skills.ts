import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './skills.html'
})
export class SkillsSectionComponent {
  public isOpen = signal(false);
  protected isTyping = signal(false);
  protected showContent = signal(false);

  protected skillsCategories = [
    { 
      name: "skills",
      items: "Linux Environments, Web Dev, Android Dev, Image & Video Processing" 
    },
    {
      name: 'Languages',
      items: 'Python, TypeScript, C++, Kotlin, Rust, Bash, SQL'
    },
    {
      name: 'Frontend',
      items: 'Angular, React, Next.js, Jetpack Compose'
    },
    {
      name: "Backend",
      items: "Nest.js, Express.js, Flask, Ktor"
    },
    {
      name: 'Databases',
      items: 'MySQL, PostgreSQL, Redis, Firebase, MongoDB'
    },
    {
      name: "Computer Vision",
      items: "OpenCV, Numpy/Eigen, FFmpeg, Ultralytics/Yolo",
    },
    {
      name: 'Deployment & Cloud',
      items: 'GitHub Actions, Docker, Railway, Cloudflare, NGINX'
    }
  ];

  protected info = [
    { key: 'OS', value: 'Arch Linux x86_64' },
    { key: 'Shell', value: 'bash 5.2.21' },
    { key: "Title", value: "Software Developer" },
    { key: 'Experience', value: "3 Years" }
  ];

  open() {
    this.isOpen.set(true);
    this.isTyping.set(true);
    this.showContent.set(false);

    // Simulate typing neofetch
    setTimeout(() => {
      this.isTyping.set(false);
      this.showContent.set(true);
    }, 3000);
  }

  close() {
    this.isOpen.set(false);
  }
}
