# Ftp_Api - Javacript, NodeJs

## Technology

Technologies used are:

* Javascript
* NodeJs - [https://nodejs.org/]

### `npm run build-ts`

Compiles all source `.ts` files to `.js` files in the `dist` folder

### `node app`

Runs app launch server and all the apps entry point.<br>
Use [http://localhost:3000](http://localhost:3000) to make an Api call.

### `npm run lint``

Runs ESLint on project files

## For the debug

If you want to debug your application, you can install the extension `Node Debug` and create a file under the root directory `.vscode` named `launch.json` and put this line<br>
&nbsp;`{`<br>
    &nbsp;&nbsp;`“version“: “0.2.0“,`<br>
    &nbsp;&nbsp;`"configurations": [`<br>
       &nbsp;&nbsp;&nbsp;`{`<br>
            &nbsp;&nbsp;&nbsp;`"type": "node",,`<br>
            &nbsp;&nbsp;&nbsp;`"request": "launch",`<br>
            &nbsp;&nbsp;&nbsp;`"name": "Launch Program",`<br>
            &nbsp;&nbsp;&nbsp;`"program": "${workspaceFolder}/app.js",`<br>
        &nbsp;&nbsp;&nbsp;`}`<br>
   &nbsp;&nbsp;`]`<br>
&nbsp;`}`<br>

## Deployments

Still not implement