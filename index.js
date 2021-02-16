#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const createProject = require('./createProject');

const promptList = [
  {
    type: 'input',
    message: 'Please enter the project name',
    name: 'name',
    default: 'my-app',
  },
  {
    type: 'list',
    message: 'Please select the project type',
    name: 'type',
    choices: fs.readdirSync(path.join(__dirname, 'template')),
  },
];

inquirer.prompt(promptList).then((answers) => {
  createProject(answers.name, answers.type);
});
