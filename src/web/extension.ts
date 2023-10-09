// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as markdown from '../markdown';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kmseditor" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('kmseditor.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from KMSEditor in a web extension host - Updated!');
	});
	let disposable2 = vscode.commands.registerCommand('kmseditor.helloWorld2', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World 2 from KMSEditor in a web extension host - Updated!');
	});

	//Markdown Features
	let insertFrontMatter = vscode.commands.registerCommand('kmseditor.insertFrontMatter', markdown.insertFrontmatter);
	let insertLink = vscode.commands.registerCommand('kmseditor.insertLink', markdown.insertLink);

	//let insertImage = vscode.commands.registerCommand('kmscore.insertImage', markdown.insertImage);
	//let insertIDUC = vscode.commands.registerCommand('kmscore.insertIDUC', markdown.insertStory);
	let insertRequirement = vscode.commands.registerCommand('kmseditor.insertRequirement', markdown.insertRequirement);

	let insertWarning = vscode.commands.registerCommand("kmseditor.insertWarning", markdown.insertWarning);
	let insertInfo = vscode.commands.registerCommand("kmseditor.insertInfo", markdown.insertInfo);
	let insertTip = vscode.commands.registerCommand("kmseditor.insertTip", markdown.insertTip);
	let insertNote = vscode.commands.registerCommand("kmseditor.insertNote", markdown.insertNote);
	
	let insertTable = vscode.commands.registerCommand("kmseditor.insertTable", markdown.insertTable);
	let insertImage = vscode.commands.registerCommand("kmseditor.insertImage", markdown.insertImage);

	let insertStory = vscode.commands.registerCommand("kmseditor.insertStory", markdown.insertStory);
	let insertTask = vscode.commands.registerCommand("kmseditor.insertTask", markdown.insertTask);

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(insertLink);
	context.subscriptions.push(insertFrontMatter);
	context.subscriptions.push(insertRequirement);

	context.subscriptions.push(insertWarning);
	context.subscriptions.push(insertInfo);
	context.subscriptions.push(insertTip);
	context.subscriptions.push(insertNote);
	context.subscriptions.push(insertTable);
	context.subscriptions.push(insertImage);

	context.subscriptions.push(insertStory);
	context.subscriptions.push(insertTask);
}

// This method is called when your extension is deactivated
export function deactivate() {}
