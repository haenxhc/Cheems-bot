
// plugins/ping.js
module.exports = {
  name: 'ping',
  description: 'Répond pong',
  category: 'util',
  async execute(sock, m, args) {
    await sock.sendMessage(m.key.remoteJid, { text: 'Pong!' }, { quoted: m })
  }
}


js
// plugins/help.js
module.exports = {
  name: 'help',
  description: 'Liste des commandes disponibles',
  category: 'util',
  async execute(sock, m, args) {
    const helpMessage = `
Commandes disponibles:
!ping - Teste le bot
!help - Liste des commandes
!groupinfo - Infos du groupe
!mentionall - Mentionne tout le groupe
!kick - Expulse un membre (admin)
!add - Ajoute un membre (admin)
!promote - Promote un membre (admin)
!demote - Demote un membre (admin)
    `
    await sock.sendMessage(m.key.remoteJid, { text: helpMessage }, { quoted: m })
  }
}


js
// plugins/groupinfo.js
module.exports = {
  name: 'groupinfo',
  description: 'Affiche les infos du groupe',
  category: 'group',
  async execute(sock, m, args) {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid)
    const text = `Nom: groupMetadata.subject:{groupMetadata.participants.length}\nDescription: ${groupMetadata.desc?.toString() || 'Aucune'}`
    await sock.sendMessage(m.key.remoteJid, { text }, { quoted: m })
  }
}


js
// plugins/mentionall.js
module.exports = {
  name: 'mentionall',
  description: 'Mentionne tous les membres du groupe',
  category: 'group',
  async execute(sock, m, args) {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid)
    const mentions = groupMetadata.participants.map(p => p.id)
    await sock.sendMessage(m.key.remoteJid, { text: 'Mention de tous les membres:', mentions }, { quoted: m })
  }
}


js
// plugins/kick.js
module.exports = {
  name: 'kick',
  description: 'Expulse un membre du groupe (admin requis)',
  category: 'group',
  async execute(sock, m, args) {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    if (!m.key.participant) return
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid)
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)
    if (!admins.includes(m.key.participant)) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Vous devez être admin pour utiliser cette commande.' }, { quoted: m })
    }
    if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Veuillez mentionner un membre à expulser.' }, { quoted: m })

    const userToKick = args[0].includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null
    if (!userToKick) return await sock.sendMessage(m.key.remoteJid, { text: 'Mention invalide.' }, { quoted: m })

    try {
      await sock.groupRemove(m.key.remoteJid, [userToKick])
      await sock.sendMessage(m.key.remoteJid, { text: 'Membre expulsé avec succès.' }, { quoted: m })
    } catch {
      await sock.sendMessage(m.key.remoteJid, { text: 'Impossible d\'expulser ce membre.' }, { quoted: m })
    }
  }
}


js
// plugins/add.js
module.exports = {
  name: 'add',
  description: 'Ajoute un membre au groupe (admin requis)',
  category: 'group',
  async execute(sock, m, args) {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    if (!m.key.participant) return
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid)
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)
    if (!admins.includes(m.key.participant)) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Vous devez être admin pour utiliser cette commande.' }, { quoted: m })
    }
    if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Veuillez mentionner un membre à promouvoir.' }, { quoted: m })

    const userToPromote = args[0].includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null
    if (!userToPromote) return await sock.sendMessage(m.key.remoteJid, { text: 'Mention invalide.' }, { quoted: m })

    try {
      await sock.groupMakeAdmin(m.key.remoteJid, [userToPromote])
      await sock.sendMessage(m.key.remoteJid, { text: 'Membre promu admin avec succès.' }, { quoted: m })
    } catch {
      await sock.sendMessage(m.key.remoteJid, { text: 'Impossible de promouvoir ce membre.' }, { quoted: m })
    }
  }
}


js
// plugins/demote.js
module.exports = {
  name: 'demote',
  description: 'Retire le statut admin d’un membre (admin requis)',
  category: 'group',
  async execute(sock, m, args) {
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Cette commande est uniquement pour les groupes.' }, { quoted: m })
    }
    if (!m.key.participant) return
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid)
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)
    if (!admins.includes(m.key.participant)) {
      return await sock.sendMessage(m.key.remoteJid, { text: 'Vous devez être admin pour utiliser cette commande.' }, { quoted: m })
    }
    if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Veuillez mentionner un membre à rétrograder.' }, { quoted: m })

    const userToDemote = args[0].includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null
    if (!userToDemote) return await sock.sendMessage(m.key.remoteJid, { text: 'Mention invalide.' }, { quoted: m })

    try {
      await sock.groupDemoteAdmin(m.key.remoteJid, [userToDemote])
      await sock.sendMessage(m.key.remoteJid, { text: 'Membre rétrogradé avec succès.' }, { quoted: m })
    } catch {await sock.sendMessage(m.key.remoteJid, { text: 'Impossible de rétrograder ce membre.' }, { quoted: m })
    }
  }
}
