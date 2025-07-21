# VU-Loading
This mod replaces every loading screen with new and redesigned 4K screens.

## Screenshots
![](https://github.com/kaloczikvn/VU-Loading/blob/master/assets/01.png?raw=true)
![](https://github.com/kaloczikvn/VU-Loading/blob/master/assets/02.png?raw=true)
![](https://github.com/kaloczikvn/VU-Loading/blob/master/assets/03.png?raw=true)
![](https://github.com/kaloczikvn/VU-Loading/blob/master/assets/04.png?raw=true)
![](https://github.com/kaloczikvn/VU-Loading/blob/master/assets/05.png?raw=true)



## run with Coherent Labs Player

**important**: remember to use your path for the Player folder (replace `D:\Gameface-1.65.2.1-Pro`).

- Run `yarn build`.
- Copy the `dist` output content (index.html, style.css, app.umd.js, images).
- Create a folder `loadingscreen` at `D:\Gameface-1.65.2.1-Pro\Player\uiresources\loadingscreen` and paste the content there.
- Edit Player.bat with this: `start "Player" /d "%wd%" "..\Player\Player.exe" --player "--url=coui://uiresources/loadingscreen/index.html" "--root=D:\Gameface-1.65.2.1-Pro\Player"`
- Run the player.