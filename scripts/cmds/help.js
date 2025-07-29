module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "2.0",
    author: "nexo_here",
    shortDescription: "Show all available commands",
    longDescription: "Display a categorized list of all available commands.",
    category: "system",
    guide: "{pn} [command name]"
  },

  onStart: async function ({ message, args, event, commandName, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

    for (const [name, cmd] of allCommands) {
      const cat = cmd.config.category || "others";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd = allCommands.get(query) || [...allCommands.values()].find(c => c.config.aliases?.includes(query));
      if (!cmd) return message.reply(`❌ Command "${query}" not found.`);

      const { name, description, category, guide, author, version, aliases } = cmd.config;
      return message.reply(
        `✨ Command Information:\n` +
        `• Name: ${name}\n` +
        `• Description: ${description || "No description"}\n` +
        `• Category: ${category}\n` +
        `• Aliases: ${aliases?.join(", ") || "None"}\n` +
        `• Version: ${version}\n` +
        `• Author: ${author}\n\n` +
        `📘 Usage:\n${guide.replace(/{pn}/g, prefix + name)}`
      );
    }

    let msg = `╭─────────⦿\n│  🌷 Flayson X Team  ⛩️\n│  ❝ Born from ashes, crowned in petals ❞\n│  ⚡ Powered by: Flayson X nexxo \n│  📍 Main GC: m.me/joinchat\n╰────────────⦿\n\n`;

    const totalCmd = [];

    for (const cat of Object.keys(categories).sort()) {
      const cmds = categories[cat].sort((a, b) => a.localeCompare(b));
      totalCmd.push(...cmds);
      msg += `╭──⦿【 ${cat.toUpperCase()} 】\n`;
      msg += cmds.map(cmd => `✧ ${cmd}`).join(" ") + "\n";
      msg += `╰────────⦿\n\n`;
    }

    msg += `╭─────────────⦿\n│ 🧠 Total Commands: ${totalCmd.length}+\n│ ⚠️ Others Coming Soon…\n╰──────────────⦿`;

    return message.reply(msg);
  }
};
