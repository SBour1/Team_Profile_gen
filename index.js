const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');

const teamArr = [];

const addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the manager?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            // validate: function (input) {
            //     if (typeof input !== 'NaN') {
            //         return true;
            //     } else {
            //         console.log("Please enter a number")
            //         return false;
            //     }
            // }
        },
    ])
        .then(
            data => {
                const manager = new Manager(data.name, data.email, data.id, data.officeNumber)
                teamArr.push(manager)
                console.log(teamArr)
                moreEmployee()
            })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the role of this employee?",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of the employee?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the emplpoyee's ID number?"
        }
    ])
    .then(
        data => {
            const employee = new Employee(data.name, data.email, data.id)
            teamArr.push(employee)
            if (data.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is the user's GitHub username?"
                    }
                ])
                .then( data => {
                    const engineer = new Engineer(data.name, data.email, data.id, data.github)
                    teamArr.push(engineer)
                })
            } else {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What is the intern's school?"
                    }
                ])
                .then( data => {
                    const intern = new Intern(data.name, data.email, data.id, data.school)
                    teamArr.push(intern)
                })
            }
            console.log(teamArr)
            moreEmployee()
        })
}

const moreEmployee = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "add",
            message: "Would you like to add an employee?"
        }
    ])
    .then( data => {
        if (data.add) {
            addEmployee();
        }
    })
}

addManager()

