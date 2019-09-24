namespace radioactiveBrainstorm {
    export enum Direction {
        DOWN = -1,
        UP = 1
    }

    let _state: {
        pos: number,
        labels: string[],
        cmds: (() => void)[],
        running: boolean
    } = { pos: 0, labels: [], cmds: [], running: false };

    /**
    * Add a menu item
    * @param label The menu item
    * @param cmd the function to execute when the item is selected
    */
    //% blockId=add_menu_item
    //% block="Add menu item with label %label"
    //% inlineInputMode=inline
    //% color=190 weight=100 icon="\f0e2"
    //% expandableArgumentMode="toggle"
    //% help=functions/add-menu-item
    export function addMenuItem(label: string, cmd: () => void) {
        _state.labels.push(label);
        _state.cmds.push(cmd);
        renderScreen();
    }

    // TODO - icon not showing
    // TODO - need to think about a callback that would allow earlier terminate
    // expand mode fails to work properly
    // Toggle logging

    /**
    * Move motor until it stalls
    * @param direction DOWN or UP
    * @param power 0 - 100
    * @param increment time to run motor; eg: 10
    * @param initial time to run motor; eg: 100
    */
    //% blockId=move_until_stall
    //% block="Move %motor | in direction %direction until stall | at power %power | using increment %increment | with initial time %startOffset | debug %debug"
    //% inlineInputMode=inline
    //% color=190 weight=100 icon="\f0e2"
    //% motor.defl=motors.mediumA direction.defl=Direction.DOWN increment.defl=10 startOffset.defl=100 power.min=1 power.max=100 power.defl=20 debug.defl = false
    //% expandableArgumentMode="toggle"
    //% help=functions/move-until-stall
    export function moveUntilStall(
        motor: motors.Motor = motors.mediumA,
        direction: Direction = Direction.DOWN,
        power: number = 20,
        increment: number = 10,
        startOffset: number = 100,
        debug: boolean = false
    ): void {
        let armPos = 0
        let lastArmPos = 0
        motor.run(direction * power, startOffset, MoveUnit.MilliSeconds)
        lastArmPos = motor.angle()
        if (debug) {
            brick.showValue("lastArmPosInit", lastArmPos, 4)
        }
        pause(100)
        while (true) {
            motor.run(direction * power, increment, MoveUnit.MilliSeconds)
            armPos = motor.angle()

            if (debug) {
                brick.showValue("lastArmPos", lastArmPos, 1)
                brick.showValue("armPos", armPos, 2)
                brick.showValue("Difference", armPos - lastArmPos, 3)
            }
            
            if (lastArmPos - armPos == 0) {
                music.playSoundEffect(sounds.communicationBravo)
                break;
            }
            lastArmPos = armPos
        }
    }

    function renderScreen() {
        brick.clearScreen()

        for (let i = 0; i < _state.labels.length; i++) {
            let selected = _state.pos === i;
            const label = _state.labels[i];
            brick.showString(`${selected ? '->' : '  '}${label}`, i + 1)
        }
    }

    function onDownPressed() {
        if (_state.pos + 1 < _state.labels.length) {
            _state.pos = _state.pos + 1;
        }
        renderScreen();
    }

    function onUpPressed() {
        if (_state.pos - 1 >= 0) {
            _state.pos = _state.pos - 1;
        }
        renderScreen();
    }

    function onEnterPressed() {
        brick.showImage(images.objectsLightning);
        _state.cmds[_state.pos]();
        renderScreen();
    }

    // Event handlers
    brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
        onDownPressed();
    })

    brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
        onUpPressed();
    })

    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
        onEnterPressed();
    })
}
