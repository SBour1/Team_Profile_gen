const Employee = require('./Employee')

class Manager extends Employee {
    constructor(name, email, id, officeNumber) {
        super(name, id, email)
        this.officeNumber = this.officeNumber
    }

    getRole() {
        return 'Manager';
    }
}

module.exports = Manager