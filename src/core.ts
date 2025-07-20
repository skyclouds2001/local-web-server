import * as vscode from 'vscode';

let hasActiveServer = false;

export const startServer = () => {
  vscode.window.showInformationMessage('Starting Local Web Server...');

  setTimeout(() => {
    hasActiveServer = true;
    vscode.window.showInformationMessage('Local Web Server started successfully!');
  }, 2500);
};

export const stopServer = () => {
  vscode.window.showInformationMessage('Stopping Local Web Server...');

  setTimeout(() => {
    hasActiveServer = false;
    vscode.window.showInformationMessage('Local Web Server stopped successfully!');
  }, 2500);
};

export const toggleServer = () => {
  if (!hasActiveServer) {
    startServer();
  } else {
    stopServer();
  }
};
