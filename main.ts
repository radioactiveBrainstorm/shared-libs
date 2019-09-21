namespace radioactiveBrainstorm {
    export enum Direction {
        DOWN = -1,
        UP = 1
    }

    // TODO - icon not showing
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
    //% block="Move %motor | in direction %direction until stall | at power %power | using increment %increment | with initial time %startOffset"
    //% inlineInputMode=inline
    //% color=190 weight=100 icon="\f0e2"
    //% motor.defl=motors.mediumA direction.defl=Direction.DOWN increment.defl=10 startOffset.defl=100 power.min=1 power.max=100 power.defl=20
    //% expandableArgumentMode="toggle"
    //% help=functions/move-until-stall
    export function moveUntilStall(motor: motors.Motor = motors.mediumA, direction: Direction = Direction.DOWN, power: number = 20, increment: number = 10, startOffset: number = 100): void {
        let armPos = 0
        let lastArmPos = 0
        motor.run(direction * power, startOffset, MoveUnit.MilliSeconds)
        lastArmPos = motor.angle()
        brick.showValue("lastArmPosInit", lastArmPos, 4)
        pause(100)
        while (true) {
            motor.run(direction * power, increment, MoveUnit.MilliSeconds)
            armPos = motor.angle()
            brick.showValue("lastArmPos", lastArmPos, 1)
            brick.showValue("armPos", armPos, 2)
            brick.showValue("Difference", armPos - lastArmPos, 3)
            if (lastArmPos - armPos == 0) {
                music.playSoundEffect(sounds.communicationBravo)
                break;
            }
            lastArmPos = armPos
        }
    }

    /**
    * Move arm down
    * @param increment time to run motor; eg: 10
    * @param initial time to run motor; eg: 100
    */
    //% blockId=arm_down
    //% block="move arm|increment %increment|startOffset %startOffset|option %option"
    //% increment.defl=10 startOffset.defl=100 option.defl=Button.A
    //% help=functions/arm-down
    export function armDown(increment: number = 10, startOffset: number = 100): void {
        let armPos = 0
        let lastArmPos = 0
        motors.mediumA.run(-20, startOffset, MoveUnit.MilliSeconds)
        lastArmPos = motors.mediumA.angle()
        brick.showValue("lastArmPosInit", lastArmPos, 4)
        pause(100)
        while (true) {
            motors.mediumA.run(-20, increment, MoveUnit.MilliSeconds)
            armPos = motors.mediumA.angle()
            brick.showValue("lastArmPos", lastArmPos, 1)
            brick.showValue("armPos", armPos, 2)
            brick.showValue("Difference", armPos - lastArmPos, 3)
            if (lastArmPos - armPos == 0) {
                music.playSoundEffect(sounds.communicationBravo)
                break;
            }
            lastArmPos = armPos
        }
    }

    /**
    * Move arm up
    */
    //% block
    //% blockId=arm_up
    //% increment.defl=10 startOffset.defl=100
    export function armUp(increment: number = 10, startOffset: number = 100): void {
        let armPos = 0
        let lastArmPos = 0
        motors.mediumA.run(20, startOffset, MoveUnit.MilliSeconds)
        lastArmPos = motors.mediumA.angle()
        brick.showValue("lastArmPosInit", lastArmPos, 4)
        pause(100)
        while (true) {
            motors.mediumA.run(20, increment, MoveUnit.MilliSeconds)
            armPos = motors.mediumA.angle()
            brick.showValue("lastArmPos", lastArmPos, 1)
            brick.showValue("armPos", armPos, 2)
            brick.showValue("Difference", armPos - lastArmPos, 3)
            if (lastArmPos - armPos == 0) {
                music.playSoundEffect(sounds.communicationBravo)
                break;
            }
            lastArmPos = armPos
        }
    }
}
