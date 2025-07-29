module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "2.0",
    author: "nexxo",
    shortDescription: "Show all available commands",
    longDescription: "Display a categorized list of all available commands.",
    category: "system",
    guide: "{pn} [command name]"
  },

  onStart: async function ({ message, args, event, commandName, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

    for (const [name, cmd] of allCommands) {
      const cat = cmd.config.category || "Others";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push({
        name: cmd.config.name,
        desc: cmd.config.shortDescription || ""
      });
    }

    // If user asked for details of a command
    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd = allCommands.get(query) || [...allCommands.values()].find(c => c.config.aliases?.includes(query));
      if (!cmd) {
        const sentMsg = await message.reply(`❌ Command "${query}" not found.`);
        // Auto delete after 60 sec
        setTimeout(() => sentMsg.unsend().catch(() => {}), 60000);
        return;
      }

      const { name, description, category, guide, author, version, aliases } = cmd.config;
      const sentMsg = await message.reply(
        `✨ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗜𝗻𝗳𝗼:\n` +
        `• Name: ${name}\n` +
        `• Description: ${description || "No description"}\n` +
        `• Category: ${category}\n` +
        `• Aliases: ${aliases?.join(", ") || "None"}\n` +
        `• Version: ${version}\n` +
        `• Author: ${author}\n\n` +
        `📘 𝗨𝘀𝗮𝗴𝗲:\n${guide.replace(/{pn}/g, prefix + name)}`
      );
      setTimeout(() => sentMsg.unsend().catch(() => {}), 60000);
      return;
    }

    // Total commands
    const totalCommands = [...allCommands.keys()].length;

    // FlaysonX Styled Menu
    let menu = `╭─────────────⦿\n`;
    menu += `│  🌷 𝗙𝗹𝗮𝘆𝘀𝗼𝗻 𝗫 𝗧𝗲𝗮𝗺  ⛩️\n`;
    menu += `│  ❝ Born from ashes, crowned in petals ❞\n`;
    menu += `│  ⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆: Flayson X nexxo\n`;
    menu += `│  📍 Main GC: m.me/joinchat\n`;
    menu += `╰─────────────⦿\n\n`;

    menu += `╭──⦿【 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦 】\n`;

    const sortedCats = Object.keys(categories).sort();
    for (const cat of sortedCats) {
      const cmds = categories[cat]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(c => c.name)
        .join(" ✧ ");
      menu += `✧ ${cat}:\n${cmds}\n\n`;
    }

    menu += `╭─────────────⦿\n`;
    menu += `│ 🧠 Total Commands: ${totalCommands}+\n`;
    menu += `│ ⚠️ Type "${prefix}help [command]" for details\n`;
    menu += `╰─────────────⦿`;

    const sentMsg = await message.reply(menu);
    // Auto delete after 60 sec
    setTimeout(() => sentMsg.unsend().catch(() => {}), 60000);
  }
};
