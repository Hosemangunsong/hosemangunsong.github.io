const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Global Background & Text
content = content.replace(/bg-gradient-to-br from-blue-50 via-white to-cyan-50/g, 'bg-[#F5F2EB]');
content = content.replace(/dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950\/20/g, 'dark:bg-[#1A1C19]');
content = content.replace(/selection:bg-blue-500\/30/g, 'selection:bg-[#D97757]/30');

// Gradients
content = content.replace(/bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-sky-400 dark:to-indigo-400/g, 'bg-gradient-to-br from-[#D97757] to-[#E8A87C] dark:from-[#E6A165] dark:to-[#C27654]');
content = content.replace(/hover:from-blue-700 hover:to-cyan-600 dark:hover:from-sky-300 dark:hover:to-indigo-300/g, 'hover:from-[#C86646] hover:to-[#D7976B] dark:hover:from-[#F5B074] dark:hover:to-[#D18563]');

// Text Colors
content = content.replace(/text-blue-600/g, 'text-[#D97757]');
content = content.replace(/dark:text-sky-400/g, 'dark:text-[#E6A165]');
content = content.replace(/dark:text-sky-300/g, 'dark:text-[#F5B074]');
content = content.replace(/hover:text-blue-600/g, 'hover:text-[#D97757]');
content = content.replace(/dark:hover:text-sky-400/g, 'dark:hover:text-[#E6A165]');
content = content.replace(/group-hover:text-blue-600/g, 'group-hover:text-[#D97757]');
content = content.replace(/dark:group-hover:text-sky-400/g, 'dark:group-hover:text-[#E6A165]');

// Replace zinc text colors
content = content.replace(/text-zinc-900/g, 'text-[#2C2C2C]');
content = content.replace(/dark:text-zinc-50/g, 'dark:text-[#E2E2D5]');
content = content.replace(/text-zinc-600/g, 'text-[#5C5C5C]');
content = content.replace(/dark:text-zinc-300/g, 'dark:text-[#B5B5A6]');
content = content.replace(/dark:text-zinc-400/g, 'dark:text-[#9A9A8A]');
content = content.replace(/text-zinc-700/g, 'text-[#4A4A4A]');
content = content.replace(/text-zinc-500/g, 'text-[#7A7A7A]');
content = content.replace(/text-zinc-400/g, 'text-[#9A9A8A]');
content = content.replace(/text-zinc-300/g, 'text-[#B5B5A6]');
content = content.replace(/dark:text-zinc-900/g, 'dark:text-[#2C2C2C]');

// Background Colors
content = content.replace(/bg-blue-50/g, 'bg-[#D97757]/10');
content = content.replace(/bg-blue-600/g, 'bg-[#D97757]');
content = content.replace(/hover:bg-blue-600/g, 'hover:bg-[#D97757]');
content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#C86646]');
content = content.replace(/dark:bg-sky-500\/10/g, 'dark:bg-[#E6A165]/10');
content = content.replace(/dark:hover:bg-sky-500\/40/g, 'dark:hover:bg-[#E6A165]/40');
content = content.replace(/dark:hover:bg-sky-500\/20/g, 'dark:hover:bg-[#E6A165]/20');
content = content.replace(/dark:hover:bg-sky-500\/10/g, 'dark:hover:bg-[#E6A165]/10');
content = content.replace(/dark:hover:bg-sky-500/g, 'dark:hover:bg-[#E6A165]');
content = content.replace(/dark:bg-sky-500/g, 'dark:bg-[#E6A165]');
content = content.replace(/hover:bg-blue-100/g, 'hover:bg-[#D97757]/20');
content = content.replace(/hover:bg-blue-200/g, 'hover:bg-[#D97757]/30');
content = content.replace(/dark:after:bg-sky-500/g, 'dark:after:bg-[#E6A165]');
content = content.replace(/after:bg-blue-600/g, 'after:bg-[#D97757]');

// Zinc Backgrounds
content = content.replace(/bg-white\/70/g, 'bg-[#F5F2EB]/70');
content = content.replace(/bg-white\/90/g, 'bg-[#F5F2EB]/90');
content = content.replace(/bg-white/g, 'bg-[#EAE6D7]');
content = content.replace(/dark:bg-zinc-950\/70/g, 'dark:bg-[#1A1C19]/70');
content = content.replace(/dark:bg-zinc-950\/90/g, 'dark:bg-[#1A1C19]/90');
content = content.replace(/dark:bg-zinc-950/g, 'dark:bg-[#1A1C19]');
content = content.replace(/bg-zinc-900\/60/g, 'bg-[#2C2C2C]/60');
content = content.replace(/bg-zinc-900/g, 'bg-[#2C2C2C]');
content = content.replace(/dark:bg-zinc-900/g, 'dark:bg-[#232521]');
content = content.replace(/bg-zinc-50/g, 'bg-[#F5F2EB]');
content = content.replace(/bg-zinc-100/g, 'bg-[#E0DCD0]');
content = content.replace(/hover:bg-zinc-200/g, 'hover:bg-[#D1CDBF]');
content = content.replace(/hover:bg-zinc-800/g, 'hover:bg-[#3A3E38]');
content = content.replace(/dark:bg-zinc-800\/50/g, 'dark:bg-[#2F332D]/50');
content = content.replace(/dark:bg-zinc-800\/80/g, 'dark:bg-[#2F332D]/80');
content = content.replace(/dark:bg-zinc-800/g, 'dark:bg-[#2F332D]');
content = content.replace(/dark:hover:bg-zinc-800/g, 'dark:hover:bg-[#3A3E38]');
content = content.replace(/dark:hover:bg-zinc-100/g, 'dark:hover:bg-[#E0DCD0]');
content = content.replace(/bg-zinc-400/g, 'bg-[#9A9A8A]');
content = content.replace(/dark:bg-zinc-700/g, 'dark:bg-[#3A3E38]');
content = content.replace(/dark:bg-zinc-100/g, 'dark:bg-[#E0DCD0]');

// Borders
content = content.replace(/border-blue-100/g, 'border-[#D97757]/20');
content = content.replace(/border-blue-200/g, 'border-[#D97757]/30');
content = content.replace(/border-blue-300/g, 'border-[#D97757]/40');
content = content.replace(/dark:border-sky-500\/20/g, 'dark:border-[#E6A165]/20');
content = content.replace(/dark:border-sky-500\/40/g, 'dark:border-[#E6A165]/40');
content = content.replace(/dark:border-sky-500\/50/g, 'dark:border-[#E6A165]/50');
content = content.replace(/focus:border-blue-500/g, 'focus:border-[#D97757]');
content = content.replace(/dark:hover:border-sky-500\/50/g, 'dark:hover:border-[#E6A165]/50');
content = content.replace(/dark:hover:border-sky-500\/40/g, 'dark:hover:border-[#E6A165]/40');
content = content.replace(/hover:border-blue-300/g, 'hover:border-[#D97757]/40');
content = content.replace(/hover:border-blue-200/g, 'hover:border-[#D97757]/30');
content = content.replace(/border-zinc-200/g, 'border-[#E0DCD0]');
content = content.replace(/dark:border-zinc-800/g, 'dark:border-[#2F332D]');
content = content.replace(/border-zinc-300/g, 'border-[#D1CDBF]');
content = content.replace(/dark:border-zinc-700\/50/g, 'dark:border-[#3A3E38]/50');
content = content.replace(/dark:border-zinc-700/g, 'dark:border-[#3A3E38]');

// Rings
content = content.replace(/focus:ring-blue-500\/20/g, 'focus:ring-[#D97757]/20');
content = content.replace(/focus:ring-blue-500\/50/g, 'focus:ring-[#D97757]/50');

// Shadows
content = content.replace(/shadow-blue-500\/20/g, 'shadow-[#D97757]/20');
content = content.replace(/shadow-blue-500\/40/g, 'shadow-[#D97757]/40');

fs.writeFileSync('src/App.tsx', content);
console.log("Theme replaced successfully.");
