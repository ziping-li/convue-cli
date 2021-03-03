let chalk = require('chalk'); // node终端样式库
let path = require('path');

require('shelljs/global'); // 执行shell脚本

let log = function (txt) {
  console.log(chalk.green.bold(txt));
};

async function createProject(type) {
  let p = process.cwd(); // 获取当前路径
  const pathArray = p.split('/');
  const name = pathArray[pathArray.length - 1];
  const root = pathArray.slice(0, -1).join('/');
  cd(root); // shell cd

  let np = path.join(__dirname, 'template', type);
  cp('-R', np + '/*', name); // shell cp

  cd(name); // shell cd
  log('Install Dependencies...');
  exec('yarn');

  log('Install Completed! \n');
  console.log('You can run:\n');
  console.log('Startup project: ' + chalk.green.bold('npm run dev'));
  console.log('Build project: ' + chalk.green.bold('npm run build'));
  console.log('Review build folder: ' + chalk.green.bold('npm run serve'));
  process.exit();
}

module.exports = createProject;
