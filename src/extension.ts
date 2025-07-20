import * as vscode from 'vscode';
import { startServerCommand, stopServerCommand, toggleServerCommand } from './constant';
import { startServer, stopServer, toggleServer } from './core';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(startServerCommand, startServer)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(stopServerCommand, stopServer)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(toggleServerCommand, toggleServer)
	);
}

export function deactivate() {}
