let chalk = require('chalk'); // node终端样式库
let fs = require('fs');
let path = require('path');
let inquirer = require('inquirer');

require('shelljs/global'); // 执行shell脚本

let log = function (txt) {
  console.log(chalk.green.bold(txt));
};

async function createProject(name, type) {
  let p = process.cwd(); // 获取当前路径
  cd(p); // shell cd

  // 检测是否存在文件夹， 如果存在，是否需要删除后安装
  if (fs.existsSync(name)) {
    log('project exists, please rename it');
    var questions = [
      {
        type: 'confirm',
        name: 'isRemoveDir',
        message: `delete ${name} ?`,
        default: false,
      },
    ];

    const answer = await inquirer.prompt(questions).then((answers) => {
      return answers;
    });

    if (!answer.isRemoveDir) {
      process.exit();
    }
    rm('-rf', name); // shell rm
    log(`delete ${name} success`);
  }

  let np = path.join(__dirname, 'template', type);
  cp('-R', np + '/', name); // shell cp

  cd(name); // shell cd
  log('Install Dependencies...');
  exec('yarn');

  log('Completed');
  process.exit();
}

module.exports = createProject;
