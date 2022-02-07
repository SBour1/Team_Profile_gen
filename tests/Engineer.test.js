const Engineer = require('../lib/Engineer')

describe ("Engineer", () => {
    it("should accept the name, ID, email, and GitHub of an Engineer and return the same", () => {
        const engineer = new Engineer("Steve", 42, "Bourpower@gmail.com", "Sbour1")
       
        expect(engineer.name).toEqual("Steve")
        expect(engineer.id).toEqual(42)
        expect(engineer.email).toEqual("Bourpower@gmail.com")
        expect(engineer.github).toEqual("Sbour1")
    })
})