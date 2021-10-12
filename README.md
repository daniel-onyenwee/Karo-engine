<h1 align="center">Welcome to Karo Engine 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1--beta-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/daniel-onyenwee/karo-engine#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/daniel-onyenwee/karo-engine/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/daniel-onyenwee/karo-engine/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/daniel-onyenwee/Karo Engine" />
  </a>
</p>

> a simple game engine for the karo project

### 🏠 [Homepage](https://github.com/daniel-onyenwee/karo-engine.git#readme)

## Install

```sh
npm install karo-engine
```

## Example

```typescript
import { Game, Character } from "karo-engine"

///get the html canvas element used for drawing the game
const canvas:HTMLCanvasElement = document.querySelector(".canvas")

///create the game
const game:Game = new Game(canvas)

const loop = time => {
  game.draw(time)
  requestAnimationFrame(loop)
}

///start the game loop
requestAnimationFrame(loop)

///create a box character named `my box`
const box:Character.Box = new Character.Box({name: "my box"})

///add the box character to the game
game.add(box)

///and like that you get a black rectangle on your screen
```

## Author

👤 **daniel_onyenwee**

* Github: [@daniel-onyenwee](https://github.com/daniel-onyenwee)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/daniel-onyenwee/karo-engine/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [daniel_onyenwee](https://github.com/daniel-onyenwee).<br />
This project is [MIT](https://github.com/daniel-onyenwee/karo-engine/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_