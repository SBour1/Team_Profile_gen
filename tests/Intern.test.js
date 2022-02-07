const Intern = require('../lib/Intern')

describe ("Intern", () => {
    it("should accept the name, ID, email, and school of an Itern and return the same", () => {
        const intern = new Intern("Steve", 42, "Bourpower@gmail.com", "Univeristy of Penn")
       
        expect(intern.name).toEqual("Steve")
        expect(intern.id).toEqual(42)
        expect(intern.email).toEqual("Bourpower@gmail.com")
        expect(intern.school).toEqual("Univeristy of Penn")
    })
})