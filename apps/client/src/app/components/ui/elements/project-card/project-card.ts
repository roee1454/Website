import { Component, input, signal, inject, OnDestroy, computed } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Project } from '@/app/types';
import { GithubService } from '@/app/services/github.service';

@Component({
  selector: 'app-project-card',
  templateUrl: 'project-card.html',
  imports: [NgIconsModule, CommonModule, AsyncPipe],
})
export class ProjectCardComponent implements OnDestroy {
  private githubService = inject(GithubService);
  public project = input.required<Project>();
  protected thumbnailError = signal(false);

  protected thumbnailQuery = computed(() =>
    this.githubService.getRepoThumbnail(this.project().name)
  );

  handleImageError() {
    this.thumbnailError.set(true);
  }

  ngOnDestroy() {
    // Caching is handled by TanStack Query in the service.
    // Object URL revocation is omitted here to keep the cache functional across components.
  }
}
