import { pathToFileURL } from 'url';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';

export function insertLine(txt: string){
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		editor.edit(editBuilder => {
			const selection = editor.selection;
			var l = editor.document.lineAt(selection.start).lineNumber;
			var p = new vscode.Position(l, 0);
			editBuilder.insert(p, txt+"\r\n");
		});
	}
}
export function insertText(title: string){
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		editor.edit(editBuilder => {
			const selection = editor.selection;
			var l = editor.document.lineAt(selection.start).lineNumber;
			var p = new vscode.Position(l, 0);
			editBuilder.insert(p, title);
		});
	}
}
export function insert(txt: string){
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		editor.edit(editBuilder => {
			const selection = editor.selection;
			var l = editor.document.lineAt(selection.start).lineNumber;
			var p = new vscode.Position(l, 0);
			editBuilder.insert(p, txt);
		});
	}
}