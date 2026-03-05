import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');

function updateImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/from ['"]\.\.\/ui\//g, "from './")
        .replace(/from ['"]\.\.\/forms\//g, "from './")
        .replace(/from ['"]\.\.\/home\//g, "from './");
        
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

try {
    const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
    files.forEach(file => {
        updateImports(path.join(srcDir, file));
    });
    console.log('Done updating imports phase 2.');
} catch (e) {
    console.error(e);
}
