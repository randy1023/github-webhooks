import express, { Request, Response } from 'express'
import { envs } from './config'
import { GithubController } from './presentation'
import { GithubService } from './presentation/services/github.service'
import { DiscordService } from './presentation/services/discord.service'
;(async () => {
  await main()
})()

async function main() {
  const app = express()
  const discordService = new DiscordService(envs.DISCORD_WEBHOOK_URL)
  const githubService = new GithubService()
  const githubController = new GithubController(githubService, discordService)

  app.use(express.json())

  app.post('/api/github', githubController.webhookHandler)

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`)
  })
}
