# electron-ide-opener
Small library for detecting and opening a file or folder in local IDEs

Mean to be used in Electron apps, but can be used in any Node.js app.

This is a copy / extract from [Github Desktop](https://github.com/desktop/desktop/tree/development/app/src/lib/editors)

## Install

```
npm install --save @kapeta/electron-ide-opener
```

## Usage

Using ESM:
```js
import { getAvailableEditors, findEditorOrDefault } from '@kapeta/electron-ide-opener';

const editors = await getAvailableEditors();
const vsCode = findEditorOrDefault('Visual Studio Code');
const defaultEditor = findEditorOrDefault(null);
```

Using CJS:
```js
const { getAvailableEditors, findEditorOrDefault } = require('@kapeta/electron-ide-opener');

const editors = await getAvailableEditors();
const vsCode = findEditorOrDefault('Visual Studio Code');
const defaultEditor = findEditorOrDefault(null);
```