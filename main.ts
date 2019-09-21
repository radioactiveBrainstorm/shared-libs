namespace radioactiveBrainstorm {
    let armPos = 0
    let increment = 0
    let lastArmPos = 0
    let startOffset = 0
    /**
    * Move arm down
    */
    //% block
    export function armDown() {
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
    export function armUp() {
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
