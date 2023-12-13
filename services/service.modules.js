class ServiceModules {
    plus(a, b) {
        return a + b
    }
    divide(a, b) {
        return a / b
    }
    multiply(a, b) {
        return a * b
    }
    minus(a, b) {
        return a - b
    }
}

const serviceModules = new ServiceModules();

const plus = serviceModules.plus
const devide = serviceModules.divide
const minus = serviceModules.minus
const multiply = serviceModules.multiply

export {
    // way to export many modules
    plus,
    devide,
    minus,
    multiply
}
