javascript
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const P = require('pino')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: 'silent' })
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, pairingCode, lastDisconnect } = update

    if(pairingCode) {
      console.log('Pairing code à entrer dans WhatsApp:', pairingCode)
    }

    if(connection === 'close') {
      if((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
        startBot()
      } else {
        console.log('Déconnecté, reconnecte manuellement.')
      }
    } else if(connection === 'open') {
      console.log('Connecté au compte WhatsApp !')
    }
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if(!msg.message || msg.key.fromMe) return

    const sender = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    if(!text) return

    if(text.toLowerCase() === 'ping') {
await sock.sendMessage(sender, { text: 'Pong!' })
    } else {
      await sock.sendMessage(sender, { text: 'Commande non reconnue.' })
    }
  })
}

startBot()
