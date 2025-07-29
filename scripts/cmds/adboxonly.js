module.exports = {
  config: {
    name: "onlyadminbox",
    aliases: ["onlyadbox", "adboxonly", "adminboxonly"],
    version: "1.0",
    author: "FlaysonX",
    countDown: 5,
    role: 0, // বটের রোল প্রয়োজনে বদলাতে পারো
    shortDescription: "Restrict bot use to group admins and bot admins only",
    longDescription: "If enabled, only group admins and bot admins can use the bot in the group",
    category: "box chat",
    guide: "{pn} [on|off]"
  },

  onStart: async function ({ args, message, event, api, threadsData, global }) {
    const threadID = event.threadID;
    const senderID = event.senderID;

    // মোড সেট করার জন্য আর্গুমেন্ট চেক
    if (!args[0] || !["on", "off"].includes(args[0].toLowerCase())) {
      return message.reply(`Usage:\n${this.config.guide.replace("{pn}", global.prefix)}`);
    }

    const mode = args[0].toLowerCase();
    const enabled = mode === "on";

    // থ্রেড ডাটায় সেট করা
    await threadsData.set(threadID, enabled, "data.onlyAdminBox");

    return message.reply(`✅ Only Admin Box mode is now ${enabled ? "ENABLED" : "DISABLED"}`);
  },

  // এই ফাংশন বটের কমান্ড এক্সিকিউশনের আগে কল করতে হবে (বটের মেইন লজিক অনুযায়ী)
  onCheck: async function ({ event, api, global, threadsData }) {
    const threadID = event.threadID;
    const senderID = event.senderID;

    // মোড চেক করো
    const onlyAdminBox = await threadsData.get(threadID, "data.onlyAdminBox") || false;
    if (!onlyAdminBox) return true; // মোড অফ থাকলে সবাই ইউজ করতে পারবে

    // গ্রুপ অ্যাডমিনদের লিস্ট পাওয়া
    const threadInfo = await api.getThreadInfo(threadID);
    const adminIDs = threadInfo.adminIDs ? threadInfo.adminIDs.map(a => a.id) : [];

    // বট অ্যাডমিন লিস্ট
    const botAdmins = global.GoatBot.botAdmins || [];

    // যদি sender গ্রুপ অ্যাডমিন বা বট অ্যাডমিন না হয়, ইউজার রিস্ট্রিক্ট করবে
    if (!adminIDs.includes(senderID) && !botAdmins.includes(senderID)) {
      // চাইলে এখানে মেসেজ পাঠাতে পারো
      api.sendMessage(
        "❌ Sorry, only group admins or bot admins can use the bot now.",
        threadID,
        event.messageID
      );
      return false; // এক্সিকিউশন বন্ধ করবে
    }

    return true; // পারমিশন আছে
  }
};
