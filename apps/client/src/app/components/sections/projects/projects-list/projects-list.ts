import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { NgIconsModule } from "@ng-icons/core";
import { GithubService } from "@/app/services/github.service";
import { ProjectCardComponent } from "@/app/components/ui/elements/project-card/project-card";
import { CardSkeletonComponent } from "@/app/components/ui/elements/card-skeleton/card-skeleton";
import { GithubRepo } from "#/types/github";
import { Project } from "@/app/types";

@Component({
    selector: "app-projects-list",
    standalone: true,
    imports: [AsyncPipe, NgIconsModule, ProjectCardComponent, CardSkeletonComponent],
    templateUrl: `projects-list.html`
})
export class ProjectsListSection {
    protected userInfo = inject(GithubService).getUserInfo();

    mapRepoToProject(repo: GithubRepo): Project {
        const pushedDate = new Date(repo.pushed_at);
        const isNew =
            new Date().getTime() - pushedDate.getTime() < 1000 * 60 * 60 * 24 * 30; // 30 days

        return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            primaryLanguage: repo.language,
            languages: [],
            topics: repo.topics,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            visibility: repo.visibility as any,
            archived: repo.archived,
            isTemplate: repo.is_template,
            isNew,
            isWip:
                repo.topics.includes("wip") || repo.topics.includes("work-in-progress"),
            owner: {
                login: repo.owner.login,
                avatarUrl: repo.owner.avatar_url,
            },
        };
    }
}
