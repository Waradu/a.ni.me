<div align="center">
  <img align="center" width="128px" src="public/icon.png" />
  <h1 align="center">A • NI • ME</h1>

   Can't keep up with all the anime you've watched? Neither can we! <br>
   Organize your list, hide the for research purpose ones and keep things under control. We won't tell. 
</div>

<br>

> \[!IMPORTANT]
>
> **Star this project**, to get notified when it releases.
> 
> Also I currently **<ins>won't accept PR's</ins>** please wait for v1 with contributing

## 🤨 A•NI•ME? what is this?

A•NI•ME helps you keep track of all the anime you’ve watched. It’s simple, fast, and easy to use! You can sort and filter your list, share it with friends.

You can also hide shows you don’t want others to see 😏. Soon, you’ll be able to sync your list across devices and get cool recommendations! It’s perfect for any anime fan who watches a lot!

<sup>why A•NI•ME? because "anime" in japanese means アニメ</sup><br>
<sup><b>ア = A, ニ = NI, メ = ME</b></sup>

## 📝 TODO

- [x] Finish this todo section

- [ ] Finish the app (v1)
  - [x] Make search work
  - [x] More info like characters/genres
  - [ ] Settings
  - [X] Get-Started & welcome screen
  - [ ] Tagging
  - [ ] Episode Tracking
  - [ ] Filtering & sorting
  - [ ] Share option
  - [ ] Export & import
  - [ ] Hide animes
  - [ ] Lightmode
  - [ ] Some QOL features if needed
  - [ ] Auto updated
  - [ ] Notification
  - [ ] Clean up design
  - [ ] Clean up spaghetti code
  - [ ] Fix bugs
  - [ ] Release beta builds (v0.X.Y)
  - [ ] Release v1

- [ ] Polishing v1 (v1.1)
  - [ ] MacOS support (maybe)
  - [ ] More content (website)
  - [ ] News/blog (website)
  - [ ] Release v1.1

- [ ] Complete the app (v2)
  - [ ] Recommendations
  - [ ] Cross-device sync
  - [ ] User profiles (maybe)
  - [ ] Feed (maybe)
  - [ ] Waifu collection (don't ask why and what) (maybe)
  - [ ] Make it secure and private :D
  - [ ] Release v2

- [ ] More to come

<sup>Feel free to share your ideas or improvements by creating an issue [here](https://github.com/Waradu/a.ni.me/issues)!</sup>

## ✨ Preview

<img width="800" alt="AppDark" src="https://github.com/user-attachments/assets/68a4c54e-7546-4bac-bf92-bb8eb51c828d">

<sup>there will also be a lightmode in the future</sup>

## ⌨️ Local development

You'll need to have Rust and bun installed. Then, follow these steps:

```zsh
git clone https://github.com/Waradu/a.ni.me.git
cd a.ni.me
bun i
bun dev
```

<sup>if you use npm / pnpm you have to change it in `src-tauri/tauri.conf.json` (`beforeDevCommand` and `beforeBuildCommand`)</sup>
