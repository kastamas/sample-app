# Business Loyalty Program

- [Gitlab](https://gitlab.com/flexypw/projects/business-loyalty-program)
- [YouTrack](http://youtrack.flexy.pw/agiles/111-32/current)

## Note about specific setup for different applications

Don't forget about specific software you might have to start any application from this repository. That "specific" items will be placed within the guides that described "how to start the development for iOS, Android, or Web application".

## The basic setup guide

### 1. Install [NodeJS](https://nodejs.org/en/)

To simply manage and install different NodeJS versions you can use [n (NodeJS Version Manager)](https://github.com/tj/n) tool. To install best-matching NodeJS version look into the Dockerfile.

### 2. Install or enable [Yarn](https://yarnpkg.com)

Follow the guide from yarn team - [how to install or enable yarn](https://yarnpkg.com/getting-started/install).

### 3. Add the SSH key to communicate with GitLab

Just follow [the guide](https://docs.gitlab.com/ee/user/ssh.html) from gitlab's documentation

### 4. Generate gitlab token to get access for the private package repository

The token will be used within `.yarnrc.yml` (look at the `${GITLAB_YARN_TOKEN}` varibale).

#### How to generate the token

1.  `go to your Gitlab account`
2.  find your avatar and click to it, then `open Preferences`
3.  `go to the Access Tokens tab`
4.  name your token, set expiration date and select any scopes you want
5.  `create token` and copy it
6.  `permanently export environmental variable` to automatically handle it every time when you are using yarn
7.  open `~/.zshrc`
8.  write the file with new instance `export GITLAB_YARN_TOKEN="Place your token here"`
9.  `reload the terminal` and go further

# Admin application (WEB)

Don't forget to pass [The basic setup guide](#the-basic-setup-guide)

## To start the development:

1. Install dependencies

```bash
yarn install
```

2. Make copy of `.env.local.dist` file with `.env.local` name (Get the right data for the file from your team leader)

3. Start application

```bash
yarn start admin
```

## To make release build:

1.  `yarn build admin --prod`
2.  `yarn start admin --prod`

# Mobile applications (React Native)

<!-- TODO: rewrite START -->

WARNING! DO NOT USE ANYTHING FROM UI-KIT in mobile. Their API's is not compatable
(RIP Demyan 10.08.2022)

<!-- TODO: rewrite END -->

## Android

Don't forget to pass [The basic setup guide](#the-basic-setup-guide)

To run on device read the following:

- React Native - [Running On Device Guide](https://reactnative.dev/docs/running-on-device)
- Nx React Native - [Package Documentation](https://nx.dev/packages/react-native)

To run android, do:

```bash
nx run-android mobile
```

## 🚧 Important! 
> You need node versions to be 16+ or higher (14 doesn't work), (16.19.0 worked well)



<details>

<summary>Troubleshooting</summary>

## Error

```bash
INSTALL_FAILED_UPDATE_INCOMPATIBLE
```

### Solution

Delete the application from device and try again - [StackOverflov](https://stackoverflow.com/questions/11891848/install-failed-update-incompatible-when-i-try-to-install-compiled-apk-on-device)

</details>

### If you want to use local API, make sure that

> 1.  run `adb reverse tcp:3333 tcp:3333` in the console

where `3333` is your API port if API hosts on `http://localhost:3333/api`

> !important: if you detach your device, you'll need to run this command again

> !important: don't forget to start your local API by typing `run mobile-api`

### Production build on device

> `nx run-android mobile --variant=release`

### Generating the release APK

0. upgrade APP versions in `build.gradle` and `AndroidManifest.xml` 
1. `cd apps/mobile/android`
2. `./gradlew assembleRelease`

find this inside `/apps/mobile/android/app/build/outputs/apk/release/app-release.apk`

### Generating the release AAB

To create release build for Android follow this guide

https://reactnative.dev/docs/signed-apk-android

> 1. `cd apps/mobile/android`
> 2. `./gradlew bundleRelease`

find this inside `/apps/mobile/android/app/build/outputs/bundle/release/app-release.aab`

## iOS

Don't forget to pass [The basic setup guide](#the-basic-setup-guide)

### Before starting the development you need installed on your computer:

- [CocoaPods](https://cocoapods.org)
- [Watchman](https://facebook.github.io/watchman/docs/install.html)



For builds on device:

**IMPORTANT:**

You need to create copy of `apps/mobile/ios/.xcode.env` as `.xcode.env.local`. And add absolute path to main.tsx
like this `/Users/mike/projects/business-loyalty-program/apps/mobile/src/main.tsx`

### To start the development

1. Install dependencies within repository

```bash
yarn install
```

2. Install dependencies within iOS application

```bash
cd ./apps/mobile/ios && pod install && cd ../../../
```

<details id="m1-pod-install-error">

<summary>If you have problemes installing dependencies with pod install and you are M1 user, this might help</summary>

```bash
sudo arch -x86_64 gem install ffi
```

```bash
arch -x86_64 pod install
```

</details><br>

3. Build the application

```bash
yarn nx bundle-ios mobile --platform="ios" --bundleOutput="apps/mobile/ios/main.jsbundle" --dev=false --assetsDest="apps/mobile/ios"
```

4. Start the application in emulator

```bash
yarn nx run-ios mobile
```

5. Or start application on device.

— `yarn start mobile`

— `then run it from xcode project`

Make sure to use `debug` build scheme, or you will not be able to use debug menu. 

# Misc

## To update the dependencies for iOS application, within it's direcotory use:

```bash
pod install --repo-update
```

Seing errors? [This might help](#m1-pod-install-error)

<!-- TODO: rewrite START -->

## Other staff

npx nx start mobile // If bundler issue

//release build test
npx react-native run-android --variant=release

Ссылка для тестирования андройда https://play.google.com/apps/internaltest/4698917203201665188

npx pod-install ios // install pods via tool

sudo lsof -i tcp:8081

nx run-android mobile --variant=release

SOMETIMES THIS SHIT FAILS TO BUILD AND DISPLAY SOME ERROR ABOUT MODULE NOT Foundation
TRY to kill bundler from xcode and run

> `nx start mobile`

For Production builds — it's vitally needed to run this command from root dir

> `nx bundle-ios mobile --entryFile='apps/mobile/src/main.tsx' --platform="ios" --bundleOutput="apps/mobile/ios/main.jsbundle" --dev=false --assetsDest="apps/mobile/ios"`

it'll bundle all project's code into the file. So this needs to be rerunned every time code changes and you want to place it into production builds

КОГДА FAST REFRESH СБОИТ — может помочь

1. Запуск эмулятора из консоли — `react-native run-ios`
2. XCODE — run build
3. Profit

## How to deploy new iOS releases

See [this guide](https://reactnative.dev/docs/publishing-to-app-store) from React Native

### Notes

#### If you seeing duplicated pods issues like multiple commands produce AccessibilityResources


Try to
delete AccessibilityResources [guide](https://stackoverflow.com/questions/64040154/xcode-12-error-multiple-commands-produce-accessibilityresources-bundle)
or delete DerivedData [(stackoveerflow guide)](https://stackoverflow.com/questions/18933321/can-i-safely-delete-contents-of-xcode-derived-data-folder)


#### If you change something in the Podfile file

you need to `pod install`, `build` and `archive` again


### Screenshots

You will need 5'5 and 6'5 screenshots for App Store

#### 5'5
1242 × 2208
```bash
yarn nx run-ios mobile --simulator="iPhone 8 Plus"
```

#### 6'5
1242 × 2688

```bash
yarn nx run-ios mobile --simulator="iPhone 11 Pro Max"
```

<!-- TODO: rewrite END -->
