import * as vscode from 'vscode';
import { startServerCommand, stopServerCommand } from './constant';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(startServerCommand, () => {
			vscode.window.showInformationMessage('Starting Local Web Server...');

			setTimeout(() => {
				vscode.window.showInformationMessage('Local Web Server started successfully!');
			}, 2500);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(stopServerCommand, () => {
			vscode.window.showInformationMessage('Stopping Local Web Server...');

			setTimeout(() => {
				vscode.window.showInformationMessage('Local Web Server stopped successfully!');
			}, 2500);
		})
	);
}

export function deactivate() {}
