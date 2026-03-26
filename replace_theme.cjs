const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Global Background
content = content.replace('from-indigo-50 via-white to-purple-50', 'from-blue-50 via-white to-cyan-50');
content = content.replace('dark:to-indigo-950/20', 'dark:to-blue-950/20');
content = content.replace('selection:bg-indigo-500/30', 'selection:bg-blue-500/30');

// Gradients
content = content.replace(/bg-gradient-to-r from-indigo-500 to-violet-500/g, 'bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-sky-400 dark:to-indigo-400');
content = content.replace(/hover:from-indigo-600 hover:to-violet-600/g, 'hover:from-blue-700 hover:to-cyan-600 dark:hover:from-sky-300 dark:hover:to-indigo-300');

// Text Colors
content = content.replace(/text-indigo-600/g, 'text-blue-600');
content = content.replace(/dark:text-indigo-400/g, 'dark:text-sky-400');
content = content.replace(/dark:text-indigo-300/g, 'dark:text-sky-300');
content = content.replace(/hover:text-indigo-600/g, 'hover:text-blue-600');
content = content.replace(/dark:hover:text-indigo-400/g, 'dark:hover:text-sky-400');
content = content.replace(/group-hover:text-indigo-600/g, 'group-hover:text-blue-600');
content = content.replace(/dark:group-hover:text-indigo-400/g, 'dark:group-hover:text-sky-400');

// Background Colors
content = content.replace(/bg-indigo-50/g, 'bg-blue-50');
content = content.replace(/bg-indigo-600/g, 'bg-blue-600');
content = content.replace(/hover:bg-indigo-600/g, 'hover:bg-blue-600');
content = content.replace(/hover:bg-indigo-700/g, 'hover:bg-blue-700');
content = content.replace(/dark:bg-indigo-500\/10/g, 'dark:bg-sky-500/10');
content = content.replace(/dark:hover:bg-indigo-500\/40/g, 'dark:hover:bg-sky-500/40');
content = content.replace(/dark:hover:bg-indigo-500\/20/g, 'dark:hover:bg-sky-500/20');
content = content.replace(/dark:hover:bg-indigo-500\/10/g, 'dark:hover:bg-sky-500/10');
content = content.replace(/dark:hover:bg-indigo-500/g, 'dark:hover:bg-sky-500');
content = content.replace(/dark:bg-indigo-500/g, 'dark:bg-sky-500');
content = content.replace(/hover:bg-indigo-100/g, 'hover:bg-blue-100');
content = content.replace(/hover:bg-indigo-200/g, 'hover:bg-blue-200');
content = content.replace(/dark:after:bg-indigo-600/g, 'dark:after:bg-sky-500');
content = content.replace(/after:bg-indigo-500/g, 'after:bg-blue-600');

// Borders
content = content.replace(/border-indigo-100/g, 'border-blue-100');
content = content.replace(/border-indigo-200/g, 'border-blue-200');
content = content.replace(/border-indigo-300/g, 'border-blue-300');
content = content.replace(/dark:border-indigo-500\/20/g, 'dark:border-sky-500/20');
content = content.replace(/dark:border-indigo-500\/40/g, 'dark:border-sky-500/40');
content = content.replace(/dark:border-indigo-500\/50/g, 'dark:border-sky-500/50');
content = content.replace(/focus:border-indigo-500/g, 'focus:border-blue-500');
content = content.replace(/dark:hover:border-indigo-500\/50/g, 'dark:hover:border-sky-500/50');
content = content.replace(/dark:hover:border-indigo-500\/40/g, 'dark:hover:border-sky-500/40');
content = content.replace(/hover:border-indigo-300/g, 'hover:border-blue-300');
content = content.replace(/hover:border-indigo-200/g, 'hover:border-blue-200');

// Rings
content = content.replace(/focus:ring-indigo-500\/20/g, 'focus:ring-blue-500/20');
content = content.replace(/focus:ring-indigo-500\/50/g, 'focus:ring-blue-500/50');

// Shadows
content = content.replace(/shadow-indigo-500\/20/g, 'shadow-blue-500/20');
content = content.replace(/shadow-indigo-500\/40/g, 'shadow-blue-500/40');

fs.writeFileSync('src/App.tsx', content);
console.log("Theme replaced successfully.");
