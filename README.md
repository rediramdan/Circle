<p align="center">
  <img width="200" src="./src/images/logo-name.png"/>
</p>
<p align="center">
  Built with React Native.
</p>

## Table of Contents

- [What is Circle ?](#what-is-circle)
- [Features](#features)
- [Screenshot](#screenshot)
- [Release](#release-apk)
- [Requirements](#requirements)
- [Usage](#usage-for-development)
- [Contributors](#contributors)

## What is Circle ?
<b>Circle</b> is an application to share messages and locations in realtime, in Circle we can send messages to friends while monitoring their location.

## Features
* Authentication with firebase
* Monitor your friend's location in realtime
* Chat with your friends

## Screenshot
<p align="center">
  <img width="200" src="https://i.ibb.co/Dk66RL5/Screenshot-20200622-180509.png" border=1/>
  <img width="200" src="https://i.ibb.co/r6ydqVV/Screenshot-20200622-180541.png" border=1/>
  <img width="200" src="https://i.ibb.co/3c3kK9K/Screenshot-20200622-180628.png" border=1/>
  <img width="200" src="https://i.ibb.co/NrtfVJ0/Screenshot-20200622-182219.png" border=1/>
</p>

## Release APK
<a href="https://drive.google.com/file/d/1orwlVxVawhQoGPlJBjGpnNj8VL32ei7g/view?usp=sharing">
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
  <center>
  <table border=0>
    <tr>
      <td align="center">
        <a href="https://github.com/rediramdan/">
          <img width="80" style="border-radius:50%" src="https://assets.codepen.io/4083995/internal/avatars/users/default.png?format=auto&height=80&version=1593313228&width=80">
        </a>
      </td>
    </tr>
  </table>
</center>

