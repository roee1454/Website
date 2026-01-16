import { GithubRepo } from '#/packages/types';

export type Social = {
  icon: string;
  url: string;
  text: string;
};

/**
 * Enhanced GitHub Project type derived from the full GitHub API response.
 * Use this when you have the full repository data.
 */
export interface GithubProject extends GithubRepo {
  /** Whether this project should be highlighted in the portfolio */
  isFeatured?: boolean;
  /** Custom display name if different from the repo name */
  displayName?: string;
}

/**
 * Curated Project type for the UI, focusing on presentation.
 */
export type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  languages: string[]; // List of languages used in the repo
  topics: string[]; // Tags/Topics
  updatedAt: string;
  pushedAt: string;
  visibility: 'public' | 'private' | 'internal';
  archived: boolean;
  isTemplate: boolean;
  isNew?: boolean;
  isWip?: boolean;
  thumbnailUrl?: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  license?: string;
};

export type Experience = {
  src: string;
  title: string;
  past: boolean;
  position: string;
  descirption: string;
  from: Date;
  to: Date;
  siteUrl: string;
};
