const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');

const teamArr = [];

const addManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the manager?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("\nPlease enter the manager's name!\n")
                    return false
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?",
            validate: idNo => {
                if (isNaN(idNo)) {
                    console.log("\nPlease enter a valid ID number!\n")
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    console.log("\nPlease enter a valid email! \n")
                    return false
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            validate: officeNo => {
                if (isNaN(officeNo)) {
                    console.log("\nPlease enter a number!\n")
                    return false;
                } else {
                    return true;
                }
            }
        },
    ])
        .then(
            data => {
                const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
                teamArr.push(manager);
            })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the role of this employee?",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of the employee?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("\nPlease enter the employee's name!\n")
                    return false
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    console.log("\nPlease enter a valid email! \n")
                    return false
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is the emplpoyee's ID number?",
            validate: idNo => {
                if (isNaN(idNo)) {
                    console.log("\nPlease enter a valid ID number!\n")
                    return false
                } else {
                    return true
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            when: (input) => input.role === "Engineer",
            validate: gitID => {
                if (gitID) {
                    return true;
                } else {
                    console.log("\nPlease enter the Engineer's GitHub username!\n")
                    return false
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
            when: (input) => input.role === "Intern",
            validate: school => {
                if (school) {
                    return true;
                } else {
                    console.log("\nPlease enter the Intern's school name!\n")
                    return false
                }
            }
        },
        {
            type: "confirm",
            name: "add",
            message: "Would you like to add an employee?",
            default: false
        }
    ])
        .then(
            data => {
                if (data.role === "Engineer") {
                    const engineer = new Engineer(data.name, data.id, data.email, data.github)
                    teamArr.push(engineer)
                } else if (data.role === "Intern") {
                    const intern = new Intern(data.name, data.id, data.email, data.school)
                    teamArr.push(intern)
                }
                if (data.add) {
                    return addEmployee();
                } else {
                    return teamArr;
                }
            }
        )
}

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log("Your team's profile has been successfully created!")
        }
    })
}

addManager()
    .then(addEmployee)
    .then(teamArr => {
        return generateHTML(teamArr);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });