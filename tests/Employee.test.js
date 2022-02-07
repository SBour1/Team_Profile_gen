const Employee = require('../lib/Employee')

describe ("Employee", () => {
    it("should accept the name, ID, and email of an Employee and return the same", () => {
        const employee = new Employee("Steve", 42, "Bourpower@gmail.com")
       
        expect(employee.name).toEqual("Steve")
        expect(employee.id).toEqual(42)
        expect(employee.email).toEqual("Bourpower@gmail.com")
    })
})