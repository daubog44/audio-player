import fs, { readdir } from 'fs/promises'

export const getDirectories = async (source: string) =>
    (await readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

export async function folderExsist(folder: string) {
    try {
        const st = await fs.stat(folder)
        return st.isDirectory();
    } catch (err) {
        return false;
    }
}

export async function getRecurseDir(dir: string, files: string[] = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = await fs.readdir(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        // Check if the current file/directory is a directory using fs.statSync
        if ((await fs.stat(name)).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            await getRecurseDir(name, files);
        } else {
            // If it is a file, push the full path to the files array
            files.push(name);
        }
    }
    return files;
}