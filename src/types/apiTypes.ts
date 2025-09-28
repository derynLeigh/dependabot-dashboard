export interface PRdto {
    id: number;
    title: string;
    url: string;
    repo: string;
    createdAt: string;
    updatedAt: string;
}

export interface RepoError {
    repo: string;
    error: string;
    code?: string;
}

export interface ApiResponse {
    data: PRdto[];
    errors: RepoError[];
    count: number;
    fromCache: boolean;
    generatedAt: string;
    summary: {
        totalReposQueried: number;
        successfulRepos: number;
        failedRepos: number;
    };
}