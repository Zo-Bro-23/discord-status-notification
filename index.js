const Discord = require('discord.js')
const dotenv = require('dotenv')
const randomColor = require('randomcolor')
dotenv.config()
const users = Object.keys(process.env).filter(key => key.startsWith('user'))
const userIds = users.map(user => process.env[user])

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildMembers]
})

const icons = {
    'desktop-online': 'https://i.imgur.com/RCX7lA1.png',
    'desktop-offline': 'https://i.imgur.com/d4KDwB3.png',
    'desktop-dnd': 'https://i.imgur.com/pLKpXk6.png',
    'desktop-idle': 'https://i.imgur.com/cgsPdos.png',
    'web-online': 'https://i.imgur.com/2vaGtaK.png',
    'web-offline': 'https://i.imgur.com/TKDY8C4.png',
    'web-dnd': 'https://i.imgur.com/EEzzNwZ.png',
    'web-idle': 'https://i.imgur.com/s2GTD6e.png',
    'mobile-online': 'https://i.imgur.com/k9MqhSy.png',
    'mobile-offline': 'https://i.imgur.com/CoBUGL4.png',
    'mobile-dnd': 'https://i.imgur.com/FAsnfCo.png',
    'mobile-idle': 'https://i.imgur.com/Lb9gGYY.png'
}

const notificationIcon = 'https://images.weserv.nl/?url=avatars.githubusercontent.com/u/62234360&h=32&w=32&fit=cover&mask=circle&maxage=7d'
const githubUser = 'https://github.com/Zo-Bro-23'
const githubRepo = 'https://github.com/Zo-Bro-23/discord-status-notification'
const author = 'Zo-Bro-23'
const thumbnail = 'https://avatars.githubusercontent.com/u/26350515?s=280&v=4'
const footer = 'Made with ❤️ and Javascript'
const footerImage = 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png'

client.login(process.env.token).then(async () => {
    const notificationUser = await client.users.fetch(process.env.notificationUser)
    client.addListener('presenceUpdate', async (oldPresence, newPresence) => {
        try {
            const User = newPresence.user
            let oldClient
            let newClient
            if (oldPresence?.clientStatus) {
                oldClient = Object.keys(oldPresence?.clientStatus)[0]
            }
            if (newPresence?.clientStatus) {
                newClient = Object.keys(newPresence?.clientStatus)[0]
            }
            const oldStatus = oldPresence?.status
            const newStatus = newPresence?.status
            if (`${oldClient}, ${oldStatus}` == `${newClient}, ${newStatus}`) return
            if (!userIds.includes(newPresence.user.id)) return
            const embed = new Discord.EmbedBuilder()
                .setColor(randomColor())
                .setTitle('Status Update')
                .setURL(githubRepo)
                .setAuthor({ name: author, iconURL: notificationIcon, url: githubUser })
                .setDescription(`Status update for @${User.username}#${User.discriminator}`)
                .setThumbnail(icons[`${newClient}-${newStatus}`] ? icons[`${newClient}-${newStatus}`] : thumbnail)
                .addFields(
                    { name: 'Old Status', value: `${oldClient ?? oldClient?.charAt(0).toUpperCase() + oldClient?.slice(1)}: ${oldStatus.charAt(0).toUpperCase() + oldStatus.slice(1)}`, inline: true },
                    { name: 'New Status', value: `${newClient ?? newClient?.charAt(0).toUpperCase() + newClient?.slice(1)}: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`, inline: true }
                )
                .setImage(User.avatarURL({ size: 128 }))
                .setTimestamp()
                .setFooter({ text: footer, iconURL: footerImage })
            if (process.env.legacy == 'true') {
                const files = []
                if (icons[`${newClient}-${newStatus}`]) {
                    files.push({ attachment: icons[`${newClient}-${newStatus}`], name: 'status.png' })
                }
                notificationUser.send({ content: `**Status update for @${User.username}#${User.discriminator}**\n${newClient ?? (newClient?.charAt(0).toUpperCase() + newClient?.slice(1))}, ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`, files })
            } else {
                notificationUser.send({ embeds: [embed] })
            }
            console.log('Presence updated', User.username, oldPresence?.clientStatus, newPresence?.clientStatus)
        } catch (error) {
            notificationUser.send(`Error: ${error}\n${error.stack}`)
        }
    })
    const welcomeEmbed = new Discord.EmbedBuilder()
        .setColor(randomColor())
        .setTitle('Status Notification Enabled')
        .setURL(githubRepo)
        .setAuthor({ name: author, iconURL: notificationIcon, url: githubUser })
        .setDescription(`Status updates are now enabled for select users`)
        .setThumbnail(thumbnail)
        .setTimestamp()
        .setFooter({ text: footer, iconURL: footerImage })
    const Users = []
    for (index in users) {
        const user = users[index]
        const User = await client.users.fetch(process.env[user])
        Users.push(User)
        welcomeEmbed.addFields({
            name: User.username,
            value: `#${User.discriminator}`,
            inline: true
        })
        console.log('Notification enabled for', `@${User.username}#${User.discriminator}`)
    }
    if (process.env.legacy == 'true') {
        const legacyParams = Users.map(User => `@${User.username}#${User.discriminator}`)
        notificationUser.send(`${'**Status updates are now enabled for select users**\n' + legacyParams.join('\n')}`)
    } else {
        notificationUser.send({ embeds: [welcomeEmbed] })
    }
})