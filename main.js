import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: '100%',
    height: 600,
    icon: '',
  });
  win.maximize();
  win.loadURL('http://localhost:5173/');
}

app.whenReady().then(() => {
  createWindow();

  app.on('active', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
