import { GitHubIssuesPayload, GitHubStartPayload } from '../../interfaces'

export class GithubService {
  constructor() {}

  onStart(payload: GitHubStartPayload): string {
    const { action, sender, repository } = payload

    return `User ${sender.login} ${action} star on repository ${repository.full_name}`
  }

  onIssues(payload: GitHubIssuesPayload): string {
    const { action, sender, repository, issue } = payload
    return `User ${sender.login} ${action} issue ${issue.title} on repository ${repository.full_name}`
  }
}
