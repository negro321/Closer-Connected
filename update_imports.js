import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');

function updateImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/from ['"]\.\.\/components\/home\//g, "from './")
        .replace(/from ['"]\.\.\/components\/forms\//g, "from './")
        .replace(/from ['"]\.\.\/components\/ui\//g, "from './")
        .replace(/from ['"]\.\.\/components\//g, "from './")
        .replace(/from ['"]\.\.\/pages\//g, "from './")
        .replace(/from ['"]\.\.\/hooks\//g, "from './")
        .replace(/from ['"]\.\.\/lib\//g, "from './")
        .replace(/from ['"]\.\/components\/home\//g, "from './")
        .replace(/from ['"]\.\/components\/forms\//g, "from './")
        .replace(/from ['"]\.\/components\/ui\//g, "from './")
        .replace(/from ['"]\.\/components\//g, "from './")
        .replace(/from ['"]\.\/pages\//g, "from './")
        .replace(/from ['"]\.\/hooks\//g, "from './")
        .replace(/from ['"]\.\/lib\//g, "from './")
        .replace(/from ['"]\.\.\/\.\.\/lib\//g, "from './")
        .replace(/from ['"]\.\.\/\.\.\/components\//g, "from './");
        
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
    console.log('Done updating imports.');
} catch (e) {
    console.error(e);
}
