import { ExternalEditorError } from './shared.js';
import { IFoundEditor } from './found-editor.js';
import { getAvailableEditors as getAvailableEditorsDarwin } from './darwin.js';
import { getAvailableEditors as getAvailableEditorsWindows } from './win32.js';
import { getAvailableEditors as getAvailableEditorsLinux } from './linux.js';
import { __DARWIN__, __LINUX__, __WIN32__ } from './env.js';

let editorCache: ReadonlyArray<IFoundEditor<string>> | null = null;

/**
 * Resolve a list of installed editors on the user's machine, using the known
 * install identifiers that each OS supports.
 */
export async function getAvailableEditors(): Promise<ReadonlyArray<IFoundEditor<string>>> {
    if (editorCache && editorCache.length > 0) {
        return editorCache;
    }

    if (__DARWIN__) {
        editorCache = await getAvailableEditorsDarwin();
        return editorCache;
    }

    if (__WIN32__) {
        editorCache = await getAvailableEditorsWindows();
        return editorCache;
    }

    if (__LINUX__) {
        editorCache = await getAvailableEditorsLinux();
        return editorCache;
    }

    console.warn(`Platform not currently supported for resolving editors: ${process.platform}`);

    return [];
}

/**
 * Find an editor installed on the machine using the friendly name, or the
 * first valid editor if `null` is provided.
 *
 * Will throw an error if the named editor could not be found (i.e. it has been removed).
 */
export async function findEditorOrDefault(name: string | null): Promise<IFoundEditor<string> | null> {
    const editors = await getAvailableEditors();
    if (editors.length === 0) {
        return null;
    }

    if (name) {
        const match = editors.find((p) => p.editor === name) || null;
        if (!match) {
            const message = `The editor '${name}' could not be found`;
            throw new ExternalEditorError(message, { openPreferences: true });
        }

        return match;
    }

    return editors[0];
}
