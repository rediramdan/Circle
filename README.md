<p align="center">
  <img width="200" src="./src/images/logo-name.png"/>
</p>
<p align="center">
  Built with React Native.
</p>

## What is Circle ?
<b>Circle</b> is an application to share messages and locations in realtime, in Circle we can send messages to friends while monitoring their location.

## Features
* Authentication with firebase
* Monitor your friend's location in realtime
* Chat with your friends

## Release APK
<a href="">
  <img src="https://img.shields.io/badge/Download%20on%20the-Google%20Drive-blue.svg?style=popout&logo=google-drive"/>
</a>

## Requirements
* [`yarn`](https://yarnpkg.com/getting-started/install)
* [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
* `Google maps API Key` you can get it [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* `Config realtime database firebase for WEB` you can get it [here](https://firebase.google.com/)
#### Example config
```
const firebaseConfig = {
  apiKey: "YOUR_apiKey",
  authDomain: "YOUR_authDomain",
  databaseURL: "YOUR_databaseURL",
  projectId: "YOUR_projectId",
  storageBucket: "YOUR_storageBucket",
  messagingSenderId: "YOUR_messagingSenderId",
  appId: "YOUR_appId",
  measurementId: "YOUR_measurementId"
};
```
## Usage for development
1. Open your terminal or command prompt
2. Type `git clone https://github.com/rediramdan/Circle.git`
3. Open the folder and type `yarn install` for install dependencies
4. Add your realtime database config to `./src/utils/configFirebase.js`
5. Add your goole maps API Key on `AndroidManifest.xml`
##### Example
  ```
  <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY"/>
  ```
6. Type `yarn run-android` for run this app
7. done
## Contributors
<p align="center">
  <img width="100" style="border-radius:50%" src="https://media-exp1.licdn.com/dms/image/C5603AQGqGm55sBcgpA/profile-displayphoto-shrink_200_200/0?e=1599091200&v=beta&t=lPhYL2n2Wpxdebuc2H02aohI-xYLc9JiN843nUvJ_B4">
</p>
<p align="center" style="margin-top:-20px">
  <b>REDI</b>
</p>

