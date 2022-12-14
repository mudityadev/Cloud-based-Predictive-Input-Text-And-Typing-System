// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {

  var executablePath = 'main_app.exe';
  var child = require('child_process').exec;

  child(executablePath, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    // frame: false,
    // show: false,

    autoHideMenuBar: true,
    icon: __dirname + '/assets/images/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const urlExist = require("url-exist");
  (async () => {
    const exists = await urlExist("http://127.0.0.1:8000/");
    // http://127.0.0.1:8000/
    // Handle result


    setTimeout(function(){
      mainWindow.loadURL('http://127.0.0.1:8000/')
  }, 4000);
  })();

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function(){
    const { exec } = require('child_process');
    exec('taskkill /f /t /im main_app.exe', (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      });
        console.log("lol")
      });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
