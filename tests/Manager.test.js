const Manager = require('../lib/Manager')

describe ("Manager", () => {
    it("should accept the name, ID, email, and office number of a Manager and return the same", () => {
        const manager = new Manager("Steve", 42, "Bourpower@gmail.com", 5)
       
        expect(manager.name).toEqual("Steve")
        expect(manager.id).toEqual(42)
        expect(manager.email).toEqual("Bourpower@gmail.com")
        expect(manager.officeNumber).toEqual(5)
    })
})