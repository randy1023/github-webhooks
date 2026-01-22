import { Request, Response } from 'express'
import { GithubService } from '../services/github.service'
import { DiscordService } from '../services/discord.service'

export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    //const signature = req.headers['x-hub-signature-256'] ?? 'unknown'
    const githubEvent = req.headers['x-github-event'] ?? 'unknown'
    const payload = req.body
    let message: string = ''

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStart(payload)
        break
      case 'issues':
        message = this.githubService.onIssues(payload)
        break
      default:
        message = `Unhandled event type: ${githubEvent}`
    }
    this.discordService
      .notifyDiscord(message)
      .then(() => res.status(200).send('Accepted'))
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
  }
}
