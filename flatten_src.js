import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;
    
    // Don't remove srcDir itself
    if (dir === srcDir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                removeEmptyDirs(fullPath);
            }
        });
        return;
    }

    const files = fs.readdirSync(dir);
    if (files.length > 0) {
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                removeEmptyDirs(fullPath);
            }
        });
    }

    // Check again if empty after processing children
    if (fs.readdirSync(dir).length === 0) {
        try {
            fs.rmdirSync(dir);
            console.log(`Removed empty directory: ${dir}`);
        } catch (e) {
            console.error(`Failed to remove ${dir}: ${e.message}`);
        }
    }
}

try {
    console.log(`Scanning ${srcDir}...`);
    // Get all files recursively first
    let allFiles = [];
    try {
        allFiles = getAllFiles(srcDir);
    } catch (e) {
        console.error("Error scanning files:", e);
    }
    
    // Move files to src root
    allFiles.forEach(filePath => {
        const fileName = path.basename(filePath);
        const destPath = path.join(srcDir, fileName);
        
        // Don't move if already in src root
        if (filePath !== destPath) {
            if (fs.existsSync(destPath)) {
                console.warn(`Skipping ${fileName}: already exists in src root.`);
            } else {
                try {
                    fs.renameSync(filePath, destPath);
                    console.log(`Moved ${fileName} to src root.`);
                } catch (e) {
                    console.error(`Error moving ${fileName}: ${e.message}`);
                }
            }
        }
    });

    // Cleanup empty directories
    console.log('Cleaning up empty directories...');
    removeEmptyDirs(srcDir);
    console.log('Done flattening.');

} catch (e) {
    console.error('Fatal error:', e);
}
