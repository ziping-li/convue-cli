#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const createProject = require('./createProject');

const promptList = [
  {
    type: 'list',
    message: 'Please select the project type',
    name: 'type',
    choices: fs.readdirSync(path.join(__dirname, 'template')),
  },
];

inquirer.prompt(promptList).then((answers) => {
  createProject(answers.type);
});
