Cheems Bot

Bot WhatsApp multi-device avec pairing code, inspiré de Cheems.

---

Description

Cheems Bot est un assistant WhatsApp automatisé permettant d’interagir via des commandes simples.  
Le bot supporte l’authentification multi-device avec pairing code et offre une base solide pour ajouter des fonctionnalités avancées, notamment la gestion de groupes.

---

Fonctionnalités

- Authentification multi-device sécurisée  
- Réception et envoi de messages textes  
- Commandes personnalisées (ping, help, etc.)  
- Support des commandes préfixées (ex: `!ping`)  
- Reconnexion automatique en cas de déconnexion non volontaire  
- Extensible pour ajouter des commandes groupes

---

Installation

Prérequis

- Node.js v16 ou supérieur  
- npm installé  
- Compte GitHub (optionnel pour fork)

Étapes


git clone https://github.com/haenxhc/cheems-bot.git
cd cheems-bot
npm install
node index.js


---

Usage

1. Lance le bot avec `node index.js`  
2. Sur la première exécution, un pairing code s’affichera dans la console  
3. Scanne ce code avec WhatsApp sur ton téléphone (WhatsApp Web > Appareils liés > Lier un appareil)  
4. Le bot se connecte automatiquement ensuite
5. 5. Envoie une commande en message privé ou en groupe avec le préfixe `!`

Commandes disponibles

| Commande     | Description                         |
|--------------|-----------------------------------|
| `!ping`      | Répond “Pong!”                    |
| `!help`      | Affiche la liste des commandes    |
| (À venir)    | Commandes groupe (ajout futur)    |

---

Contribution

Les contributions sont les bienvenues !  
Merci de respecter le guide de contribution dans `.github/CONTRIBUTING.md`.

---

Licence

MIT © HAENXHC  


---

Contact

Pour toute question, ouvre une issue sur GitHub ou contacte-moi via WhatsApp.
(+33 7 46 37 96 73)
