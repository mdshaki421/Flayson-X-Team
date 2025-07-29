module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "FlaysonX Team",
    role: 0,
    shortDescription: {
      en: "Show bot info"
    },
    longDescription: {
      en: "Displays bot branding and admin information in FlaysonX theme"
    },
    category: "flaysonx",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, threadsData, event }) {
    const threadName = await threadsData.get(event.threadID, "threadInfo.threadName") || "Group Chat";

    const content = `
╭─────────────╮
   ✦ 𝗙𝗹𝗮𝘆𝘀𝗼𝗻𝗫 𝗦𝘆𝘀𝘁𝗲𝗺 ✦
╰─────────────╯
『 🖤 𝐁𝐨𝐭 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 🖤 』

🌐 Name: ${threadName} ☁️
🧠 Version: v1.0-stable
🔧 Platform: GoatBot | Node.js
🔮 Prefix: !

──────────────

👑 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧𝐬:
∘ Flayson S ✦ [Lead Dev]
∘ Flayson J ✦ [Founder]
∘ Nexo ✦ [System Architect]

📎 Team: FlaysonX Cult ⚜️
📁 Commands: Type !help
🖤 Team: Flayson X

──────────────
Powered by: Flayson X Team  
© 2025 All Rights Reserved
`;

    message.reply(content);
  }
};
