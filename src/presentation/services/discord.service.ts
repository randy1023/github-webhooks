export class DiscordService {
  private readonly discordWebhookUrl: string
  constructor(discordWebhookUrl: string) {
    this.discordWebhookUrl = discordWebhookUrl
  }

  async notifyDiscord(message: string): Promise<boolean> {
    const body = {
      content: message,
      //   embeds: [
      //     {
      //       image: {
      //         url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzRlNnM1d285aGp5emppZXdudG5mOWhzbGd1YTN5bnFkc2k2a3hyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif',
      //       },
      //     },
      //   ],
    }

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error(
        `Failed to send Discord notification: ${response.statusText}`
      )
      return false
    }
    return true
  }
}
