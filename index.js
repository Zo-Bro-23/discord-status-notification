const Discord = require('discord.js')
const dotenv = require('dotenv')
const randomColor = require('randomcolor')
dotenv.config()
const users = Object.keys(process.env).filter(key => key.startsWith('user'))

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildMembers]
})

const notificationIcon = 'https://images.weserv.nl/?url=avatars.githubusercontent.com/u/62234360&h=32&w=32&fit=cover&mask=circle&maxage=7d'
const githubUser = 'https://github.com/Zo-Bro-23'
const githubRepo = 'https://github.com/Zo-Bro-23/discord-status-notification'
const author = 'Zo-Bro-23'
const thumbnail = 'https://avatars.githubusercontent.com/u/26350515?s=280&v=4'
const footer = 'Made with ❤️ and Javascript'
const footerImage = 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'

client.login(process.env.token).then(async () => {
    users.forEach(async user => {
        const User = await client.users.fetch(process.env[user])
        User.client.addListener('presenceUpdate', async (oldPresence, newPresence) => {
            if (`${Object.keys(oldPresence.clientStatus)[0]}, ${oldPresence.status}` == `${Object.keys(newPresence.clientStatus)[0]}, ${newPresence.status}`) return
            const notificationUser = await client.users.fetch(process.env.notificationUser)
            const oldClient = Object.keys(oldPresence.clientStatus)[0]
            const newClient = Object.keys(newPresence.clientStatus)[0]
            const oldStatus = oldPresence.status
            const newStatus = newPresence.status
            const embed = new Discord.EmbedBuilder()
                .setColor(randomColor())
                .setTitle('Status Update')
                .setURL(githubRepo)
                .setAuthor({ name: author, iconURL: notificationIcon, url: githubUser })
                .setDescription(`Status update for @${User.username}#${User.discriminator}`)
                .setThumbnail(thumbnail)
                .addFields(
                    { name: 'Old Status', value: `${oldClient.charAt(0).toUpperCase() + oldClient.slice(1)}: ${oldStatus.charAt(0).toUpperCase() + oldStatus.slice(1)}`, inline: true },
                    { name: 'New Status', value: `${newClient.charAt(0).toUpperCase() + newClient.slice(1)}: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`, inline: true }
                )
                .setImage(User.avatarURL({ size: 128 }))
                .setTimestamp()
                .setFooter({ text: footer, iconURL: footerImage })
            if (process.env.legacy == 'true') {
                notificationUser.send(`**Status update for @${User.username}#${User.discriminator}**\n${newClient.charAt(0).toUpperCase() + newClient.slice(1)}, ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`)
            } else {
                notificationUser.send({ embeds: [embed] })
            }
            console.log('Presence updated', User.username, oldPresence.clientStatus, newPresence.clientStatus)
        })
    })
})