const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('d:/IsharaFernando_tutor/frontend/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it has the string
    if (content.includes('http://localhost:5000')) {
      // Replace single quotes
      content = content.replace(/'http:\/\/localhost:5000([^']+)'/g, '`${import.meta.env.VITE_API_URL}$1`');
      // Replace double quotes
      content = content.replace(/"http:\/\/localhost:5000([^"]+)"/g, '`${import.meta.env.VITE_API_URL}$1`');
      // Replace backticks
      content = content.replace(/`http:\/\/localhost:5000([^`]+)`/g, '`${import.meta.env.VITE_API_URL}$1`');
      
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
});
console.log('Replaced all URLs');
