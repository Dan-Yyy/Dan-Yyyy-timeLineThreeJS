import { makeAutoObservable } from "mobx"

class States {
    visibleButtons = true

    opacityDots = 1 

    wheelActive = true

    constructor() {
        makeAutoObservable(this)
    }

    getVisibleButtons() {
        return this.visibleButtons
    }

    setVisibleButtons(value) {
        return this.visibleButtons = value
    }

    getOpacityDots() {
        return this.opacityDots
    }
    
    setOpacityDots(value) {
        return this.opacityDots = value
    }

    getWheelActive() {
        return this.wheelActive
    }
    
    setWheelActive(value) {
        return this.wheelActive = value
    }
}

export default new States()
