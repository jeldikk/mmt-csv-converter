
## mmt to csv converter
_powered by electron, angular, nodejs, typescript_

### Introduction

mmt to csv converter desktop application made using electron, Angular, Nodejs

**what are moment or .mmt file ?**

moments file is a binary file format used for transport/storing radar generated gaussian moments in an electronic form. It is L2 level data with necessary information to derive parameters.

**How this app helps you in saving a lot of coding time**

moments file or .mmt file are L2 level data products which must undergo further computation processing to derive necessary U, V, W, Direction data products which have great value for scientific research. Previously researcher/scientific groups would invest professional time in uderstanding the format and implement code to read these .mmt files.

This application will help you in transforming .mmt files to standard scientific friendly .csv files, which the reasercher can analyse output using tools and languages of their own interest.

The generated .csv file are called L3 level data products with fields height, U, V, W, Direction, Zenith SNR, Zenith doppler.

#### Credits


The starter electron+angluar bootstrap is taken from [here](https://github.com/maximegris/angular-electron). Thanks to [maximegris](https://github.com/maximegris) for his wonderful work in bootstrap.


#### release info

1.0.0 - release20220102
* can validate and inspect operation to get mmt file info
* can convert mmt file csv file to an output folder
* error handler with with responsive acknowledgement

<br>
<br>
<br>
<br>
<br>
<br>
<br>

> _**If you are a python/nodejs developer, you can scroll futher.**_ :)

### Getting Started

#### setting python environment
make sure virtualenv is installed to generate python environment folder `venv` and install python `numpy` module.

```sh
$ virtualenv ./app/lib/venv
$ activate
(venv)$ pip install numpy
```

#### setting node environment

*Clone this repository locally:*

``` bash
git clone https://github.com/jeldikk/mmt-csv-converter.git
```

*Install dependencies with npm (used by Electron renderer process):*

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

*Install NodeJS dependencies with npm (used by Electron main process):*

``` bash
cd app/
npm install
```

Why two package.json ? This project follow [Electron Builder two package.json structure](https://www.electron.build/tutorials/two-package-structure) in order to optimize final bundle and be still able to use Angular `ng add` feature.

#### To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload!

The application code is managed by `app/main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200), and an Electron window. \
The Angular component contains an example of Electron and NodeJS native lib import. \
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `app/main.ts`.

### Project structure

|Folder|Description|
| ---- | ---- |
| app | Electron main process folder (NodeJS) |
| src | Electron renderer process folder (Web / Angular) |

### Add a dependency with ng-add

You may encounter some difficulties with `ng-add` because this project doesn't use the defaults `@angular-builders`. \
For example you can find [here](HOW_TO.md) how to install Angular-Material with `ng-add`.

### Browser mode

Maybe you only want to execute the application in the browser with hot reload? Just run `npm run ng:serve:web`.

## Included Commands

|Command|Description|
| ---- | ---- |
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:build`| Builds your application and creates an app consumable based on your operating system |

**Your application is optimised. Only /dist folder and NodeJS dependencies are included in the final bundle.**


### E2E Testing

E2E Test scripts can be found in `e2e` folder.

|Command|Description|
| ---- | ---- |
|`npm run e2e`| Execute end to end tests |

Note: To make it work behind a proxy, you can add this proxy exception in your terminal  
`export {no_proxy,NO_PROXY}="127.0.0.1,localhost"`
