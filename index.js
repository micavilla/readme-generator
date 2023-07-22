// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: "What's the title of your project?"
  }, 
  {
    type: 'input',
    name: 'description',
    message: "Enter the description of your project."
  },
  {
    type: 'input',
    name: 'installation',
    message: "Enter intallation details."
  },
  {
    type: 'input',
    name: 'usage',
    message: "Enter usage information."
  },
  {
    type: 'list',
    name: 'license',
    message: "Which license would you like for your project?",
    choices: ['MIT', 'GPLv3', 'Apache', 'BSD', 'Unlicensed']
  },
  {
    type: 'input',
    name: 'contributing',
    message: "Enter any contributions."
  },
  {
    type: 'input',
    name: 'tests',
    message: "Enter any tests required for your project."
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username.',
},
{
    type: 'input',
    name: 'email',
    message: 'Enter your email address.',
}]

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  const content = typeof data ==='string' ? data : JSON.stringify(data, null, 2);

  fs.writeFile(fileName, content, (err) => {
    if(err) {
      console.error('error making file: ', err);
    } else {
      console.log('File successfully created: ', fileName);
    }
  })
}

// TODO: Create a function to initialize app
function init() {
  inquirer
  .prompt(questions)
  .then((response)=> {
    const readMeContent = generateReadMeContent(response);
    writeToFile('README.md', readMeContent);
  })
  .catch((error)=> {
    console.error('error: ', error);
  })
}

function generateReadMeContent(response) {
  return `# ${response.title}
  
  ## Description
  ${response.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)
  
  ## Installation
  ${response.Installation}

  ## Usage
  ${response.usage}

  ## Contributing
  ${response.contributing}

  ## Tests
  ${response.tests}

  ## License
  ${response.license}

  ## Questions
  For any questions about the project, please feel free to reach out to [${response.github}](https://github.com/${response.github}) or contact via email at ${response.email}.
  `;
}

// Function call to initialize app
init();
