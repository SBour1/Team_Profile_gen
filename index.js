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
                const manager = new Manager(data.name, data.email, data.id, data.officeNumber);
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
            message: "What is the name of the employee?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the emplpoyee's ID number?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            when: (input) => input.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
            when: (input) => input.role === "Intern"
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