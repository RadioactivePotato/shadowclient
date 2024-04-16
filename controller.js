let controllerIndex = null;

//Left JoyStick
let leftRightAxis1 = 0;
let upDownAxis1 = 0;

//Right JoyStick
let leftRightAxis2 = 0;
let upDownAxis2 = 0;

const buttonStates = {};

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    controllerIndex = gamepad.index;
});

window.addEventListener("gamepaddisconnected",(event) => {
    controllerIndex = null;
});

function handleSticks(axes) {
    updateStick1(axes[0], axes[1]);
    updateStick2(axes[2], axes[3]);
}

function updateStick1(leftRighAxis, upDownAxis) {
    const multiplier = 25;
    const stickLeftRight = leftRighAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;
    leftRightAxis1 = stickLeftRight;
    upDownAxis1 = stickUpDown;
}

function updateStick2(leftRightAxis, upDownAxis) {
    const multiplier = 25;
    const stickLeftRight = leftRightAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;
    leftRightAxis2 = stickLeftRight;
    upDownAxis2 = stickUpDown;
}

function controllerConnected() {
    if(controllerIndex != null) {
        return true;
    }
    return false;
}

function getCameraX() {
    return leftRightAxis2; 
}

function getCameraY() {
    return upDownAxis2;
}

function isWalkingForward() {
    if(upDownAxis1 < 0) {
        return true;
    }
    return false;
}

function isWalkingBackward() {
    if(upDownAxis1 > 0) {
        return true;
    }
    return false;
}

function isWalkingLeft() {
    if(leftRightAxis1 < 0) {
        return true;
    }
    return false;
}

function isWalkingRight() {
    if(leftRightAxis1 > 0) {
        return true;
    }
    return false;
}

function isKeyDown(keyCode) {
    const gamepads = navigator.getGamepads();
    if (gamepads.length > 0) {
      const gamepad = gamepads[0];
      if (gamepad) {
        const button = gamepad.buttons.find(btn => btn.value !== 0 && btn.keyCode === keyCode);
        return !!button;
      }
    }
    return false;
}
  
  function isPressed(keyCode) {
    const gamepads = navigator.getGamepads();
    if (gamepads.length > 0) {
      const gamepad = gamepads[0];
      if (gamepad) {
        const button = gamepad.buttons.find(btn => btn.keyCode === keyCode);
        if (button.pressed && !buttonStates[keyCode]) {
          buttonStates[keyCode] = true;
          return true;
        } else {
          buttonStates[keyCode] = button.pressed;
          return false;
        }
      }
    }
    return false;
}

function updateController() {
    if(controllerConnected()) {
        if(controllerIndex != null) {
            const gamepad = navigator.getGamepads()[controllerIndex];
            handleSticks(gamepad.axes);
        }
    }
    requestAnimationFrame(updateController);
}

requestAnimationFrame(updateController);