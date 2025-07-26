import * as vscode from 'vscode';
import fs from 'node:fs';

const extensionName = 'Local Web Server';
const startServerCommand = 'local-web-server.startServer';
const stopServerCommand = 'local-web-server.stopServer';
const toggleServerCommand = 'local-web-server.toggleServer';
const configurationViewId = 'local-web-server-configuration';

let hasActiveServer = false;
let statusBarItem: vscode.StatusBarItem | null = null;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(startServerCommand, startServer)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(stopServerCommand, stopServer)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(toggleServerCommand,  toggleServer)
	);

  const statusBarAlignment = vscode.window.activeTextEditor ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;
  statusBarItem = vscode.window.createStatusBarItem('', statusBarAlignment, 99);
  statusBarItem.name = extensionName;
  statusBarItem.text = '$(server) Local Web Server';
  statusBarItem.tooltip = 'Click to start the Local Web Server';
  statusBarItem.command = toggleServerCommand;
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  const sidebarUri = vscode.Uri.joinPath(context.extensionUri, 'static', 'sidebar.html');
  const sidebarHtmlContent = fs.readFileSync(sidebarUri.fsPath, 'utf-8');
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(configurationViewId, new class implements vscode.WebviewViewProvider {
      constructor (private readonly extensionUri: vscode.Uri, private readonly extensionName: string) {}

      public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken)  {
        webviewView.webview.options = {
          enableScripts: true,
          localResourceRoots: [
            this.extensionUri,
          ],
        };
        webviewView.webview.html = sidebarHtmlContent
          .replaceAll('%title%', extensionName)
          .replaceAll('%csp%', webviewView.webview.cspSource);
      }
    }(context.extensionUri, extensionName), {
      webviewOptions: {
        retainContextWhenHidden: true,
      }
    })
  );
}

export function deactivate() {}

function startServer () {
  vscode.window.showInformationMessage('Starting Local Web Server...');

  setTimeout(() => {
    hasActiveServer = true;
    statusBarItem!.tooltip = 'Click to stop the Local Web Server';
    vscode.window.showInformationMessage('Local Web Server started successfully!');
  }, 2500);
};

function stopServer () {
  vscode.window.showInformationMessage('Stopping Local Web Server...');

  setTimeout(() => {
    hasActiveServer = false;
    statusBarItem!.tooltip = 'Click to start the Local Web Server';
    vscode.window.showInformationMessage('Local Web Server stopped successfully!');
  }, 2500);
};

function toggleServer () {
  if (!hasActiveServer) {
    startServer();
  } else {
    stopServer();
  }
};
