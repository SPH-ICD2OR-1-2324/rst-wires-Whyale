namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3()
    }
    if (wireCount == 4) {
        _4()
    }
    if (wireCount == 5) {
        _5()
    }
    if (wireCount == 6) {
        _6()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
function _6 () {
    Black = 0
    Blue = 0
    Red = 0
    Yellow = 0
    White = 0
    for (let value of WireList) {
        if (value == 2) {
            Yellow += 1
        }
        if (value == 3) {
            Yellow += 1
        }
        if (value == 0) {
            Red += 1
        }
        if (value == 4) {
            White += 1
        }
        if (value == 4) {
            Black += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        odd = true
    } else {
        odd = false
    }
    if (Yellow == 0 && odd == true) {
        game.splash("Cut the third wire")
    } else if (Yellow == 1 && White > 1) {
        game.splash("Cut the fourth wire")
    } else if (Red == 0) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the fourth wire")
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function _5 () {
    Black = 0
    Blue = 0
    Red = 0
    White = 0
    Yellow = 0
    for (let value of WireList) {
        if (value == 2) {
            Blue += 1
        }
        if (value == 4) {
            Black += 1
        }
        if (value == 3) {
            Yellow += 1
        }
        if (value == 0) {
            Red += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        odd = true
    }
    if (WireList[4] == 4 && odd == true) {
        game.splash("Cut the fourth wire")
    } else if (Red == 1 && Yellow > 1) {
        game.splash("Cut the first wire")
    } else if (Black == 0) {
        game.splash("Cut the second wire")
    } else {
        game.splash("Cut the first wire")
    }
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _3 () {
    Blue = 0
    Red = 0
    for (let value of WireList) {
        if (value == 2) {
            Blue += 1
        }
        if (value == 0) {
            Red += 1
        }
    }
    if (Red == 0) {
        game.splash("Cut the second wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (WireList[1] > 2) {
        game.splash("Cut the second wire")
    } else if (Blue > 1) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the last wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _4 () {
    Black = 0
    Yellow = 0
    Blue = 0
    Red = 0
    White = 0
    for (let value of WireList) {
        if (value == 2) {
            Blue += 1
        }
        if (value == 3) {
            Yellow += 1
        }
        if (value == 0) {
            Red += 1
        }
    }
    if (SerialNumber % 2 == 1) {
        odd = true
    }
    if (Red > 1 && odd == true) {
        game.splash("Cut the red last wire")
    } else if (WireList[3] == 3 && Red == 0) {
        game.splash("Cut the first wire")
    } else if (Blue > 1) {
        game.splash("Cut the first wire")
    } else if (Yellow > 1) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the second wire")
    }
}
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let odd = false
let WireList: number[] = []
let White = 0
let Yellow = 0
let Red = 0
let Blue = 0
let Black = 0
let SerialNumber = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
