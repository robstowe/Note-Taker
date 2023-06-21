// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
const createREADME = (response) => 
`
# ${response.title}

## Description
${response.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Licenses](#licenses)
- [Contribution](#contribution)
- [Testing](#testing)
- [Questions](#questions)

## Installation
${response.installation}

## Usage
${response.usage}

## Licenses
${response.licenses}
[![License](https://img.shields.io/badge/License-${response.licenses}-green.svg)](https://opensource.org/licenses/${response.licenses})

## Contribution
${response.contribution}

## Testing
${response.testing}

## Questions
Questions can be directed to ${response.userEmail}

https://github.com/${response.gitName}
`
//Inquirer allows the user to type out the questions, via prompt
inquirer.prompt([
    {  
        type: "input" ,
        message: "What is the name of the project?",
        name: "title",
    },
    {   
        type: "input" ,
        message: "What is the name of the user?",
        name: "userName",
    },
    {  
        type: "input" ,
        message: "Please provide a description of the project",
        name: "description",
    },
    {   
        type: "input" ,
        message: "What is the installation process?",
        name: "installation",
    },
    {   
        type: "input" ,
        message: "How will this project be used?",
        name: "usage",
    },
    {   
        type: "list" ,
        message: "What licenses are required with this project?",
        name: "licenses",
        choices: ["MIT", "Boost_1.0", "IPA_Font_License(IPA)"]
    },
    {   
        type: "input" ,
        message: "Who were the contributors to this project?",
        name: "contribution",
    },
    {   
        type: "input" ,
        message: "What is the testing process for this project?",
        name: "testing",
    },
    {   
        type: "input" ,
        message: "What is the user github email address?",
        name: "userEmail",
        
    },
    {   
        type: "input" ,
        message: "What is your github username",
        name: "gitName",
        
    },

])
.then((apple) => {
    const content = createREADME(apple)
    fs.writeFile("README.md", content, (error) => //fs means file storage. "README.md creates the readme file, and shoves that into the const 'content' "
    error ? console.log("This is the error", error) : console.log("README.md created succesfully")) // This is a ternary - ? is an IF statement, : is an else statement
})