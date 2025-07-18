import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const startServerCommandDisposable = vscode.commands.registerCommand('local-web-server.startServer', () => {
		vscode.window.showInformationMessage('Starting Local Web Server...');

		setTimeout(() => {
			vscode.window.showInformationMessage('Local Web Server started successfully!');
		}, 2500);
	});

	const stopServerCommandDisposable = vscode.commands.registerCommand('local-web-server.stopServer', () => {
		vscode.window.showInformationMessage('Stopping Local Web Server...');

		setTimeout(() => {
			vscode.window.showInformationMessage('Local Web Server stopped successfully!');
		}, 2500);
	});

	context.subscriptions.push(startServerCommandDisposable, stopServerCommandDisposable);
}

export function deactivate() {}
