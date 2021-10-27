# Change log for [Karo Engine](https://github.com/daniel-onyenwee/karo-engine.git)

## 0.0.3-beta 2021-10-27

### Feature addition

- Replace the __DataStorage__ utility with the __DataManager__  utility

- Add 🛠 utility class __EvemtEmitter__ to handle calling and setting of different events of a character

- Add support for the game to emit the __*init*__, __*update*__, __*final*__ events of each characters and its children characters

- Add suppport for the __timer__ character to emit the __*timeout*__ event when the timer ends

- Add suppport for the __loop__ character to emit the __*end*__ event when the loop ends and to emit the __*each*__ each time the loop runs

- Add suppport for the __condition__ character to emit the __*is true*__ event if the condition returns *true* and emit the __*is false*__ event if the condition returns *false*

- Add suppport for the __sound__ character to emit the __*fininshed*__ event when the sound stop playing

- Add suppport for the __Game__ to emit the __*ready*__ event when the game is ready to start runing and to emit the __*update*__ event when the game is updated

- Add support for characters to emit the __*extra small size*__, __*small size*__, __*medium size*__, __*large size*__, __*extra large size*__ depending on the canvas size

- Add support to __stop__ and __play__ the game loop

- Add support for the __Text__, __Box__, __Image__, __Arc__ character to emit the __*input*__ event when  *mouse*, *pen* and *touch* device make contact with the character

### Maintenance addition

- Rename the public property __entry__ to __allProperties__

### Fix bugs

- Fix the blur nature of the game characters

## 0.0.2-beta 2021-10-18

### Feature addition

- Add support to change canvas background color

- Add support to set project __name__, __author name__ and __version__

- Add public getter __tree__ to all characters and game class. Use get a character children tree

- Add support for __readonly__ character property

- Add support to override __readonly__

### Maintenance addition

- Add the [CHANGELOG.md](https://github.com/daniel-onyenwee/Karo-engine/blob/main/CHANGELOG.md) file

- Install the typedoc package as a devDependency

- Set character properties like __is destroyed__ and __is initalize__ to __*readonly*__ property

## 0.0.1-beta 2021-10-12

- Initial release
