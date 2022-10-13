import { makeAutoObservable } from "mobx"

class States {
    visibleButtons = true

    opacityDots = 1 

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
}

export default new States()
