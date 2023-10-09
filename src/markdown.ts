import { pathToFileURL } from 'url';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';
import * as vseditor from './vseditor';
import * as utilities from './utilities';

export async function insertLink(){
    const editor = vscode.window.activeTextEditor;

    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert an ID, you must open a folder first');
    }
    var title = await vscode.window.showInputBox({ placeHolder: "Link title", prompt: "Please enter a link title" }) as string;
    
    var http = await vscode.window.showInputBox({ placeHolder: "Http Link", prompt: "Please enter http url" }) as string;
    if (http !== ''){

        if (title === '') {title = http;}
        vseditor.insertLine('['+title+']('+http+')');
    }
}

export async function insertFrontmatter(){

    const editor = vscode.window.activeTextEditor;

    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert Front Matter, you must open a folder first');
    }
    //const folderUri = vscode.workspace.workspaceFolders[0].uri;
    var title = await vscode.window.showInputBox({ placeHolder: "Topic Title", prompt: "Please enter your Topic Title" }) as string;
    if (title === undefined){title = '';}

    var options = "";
    var components = "";

    var type = "Requirement";
    const resultType = await vscode.window.showQuickPick(['Epic', 'Notes', 'Reference', 'Requirement', 'Roadmap Item', "Customer Issue"], {
        placeHolder: 'Topic Type [REQUIRED]'
        //onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
    });

    if (resultType !== undefined){
        type = resultType as string;
    }else{
        return;
    }

    var status = "";

    if (type === 'Epic'){
        var epicname = await vscode.window.showInputBox({ placeHolder: "Epic Summary", prompt: "Please enter the Name of the Epic for these Requirements" }) as string;
        if (epicname !== undefined){
            options = options + "epicsummary: "+  epicname+"\r\n";
        }else{
            options = options + "epicsummary: " +"\r\n";
        }
        var jiraKey = await vscode.window.showInputBox({ placeHolder: "Jira Key", prompt: "Please enter the Jira Project Keys (Comma Seperated) for the Epic" }) as string;
        if (jiraKey !== undefined){
            options = options + "jiraKey: "+  jiraKey+"\r\n";
        }else{
            options = options + "jiraKey: " +"\r\n";
        }
    }

    if (type === 'Customer Issue'){
        const jiraType = await vscode.window.showQuickPick(['Inqury', 'Feature request', 'Bug'], {
            placeHolder: 'Topic Type [REQUIRED]'
        });

        if(jiraType !== undefined){

            options = options + "jiratype: " +jiraType+"\r\n";
            options = options + "topictype: SCI" +"\r\n";
            options = options + "jiraKey: SCI" +"\r\n";

            const compprompt = await vscode.window.showQuickPick(['Service Management', 'Technician Enablement', 'Warranty Contract Management'], {
                placeHolder: 'Issue Component [REQUIRED]'
                //onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
            });
            if (compprompt !== undefined){
                components =  compprompt;

                var customer = await vscode.window.showInputBox({ placeHolder: "Customer", prompt: "Please enter the Customer this issue is for" }) as string;
                if (customer !== undefined){
                    options = options + "customer: "+  customer+"\r\n";
                }else{
                    options = options + "customer: " +"\r\n";
                }
            }
            const priority = await vscode.window.showQuickPick(['Critical', 'High', 'Medium', 'Low'], {
                placeHolder: 'Issue Priority [REQUIRED]'
                //onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
            });
            if (priority !== undefined){
                options = options + "priority: " +priority+"\r\n";
            }else{
                options = options + "priority: " +"\r\n";
            }
            var parentID = await vscode.window.showInputBox({ placeHolder: "Confluence Parent ID", prompt: "Please enter Page ID - (565809909) will be used as default" }) as string;
                if (parentID !== undefined){
                    options = options + "parentid: 565809909"+"\r\n";
                }else{
                    options = options + "parentid: " + parentID +"\r\n";
                }
            
        }

    }
    if (type === 'Roadmap Item'){
       
    }
    if (type === 'Requirement'){
        
        var epicid = await vscode.window.showInputBox({ placeHolder: "EpicID (Optional)", prompt: "Please enter the Epic ID (Jira ID) of the Epic for these Requirements" }) as string;
        if (epicid !== undefined){
            options = options = options + "jiraid: "+  epicid+"\r\n";
        }else{
            options = options + "jiraid: " +"\r\n";
        }
        
    }
        
    /*

    if (type === 'Requirement' || type === 'Reference' || type === 'Epic'){
        var cmpt = await addComponents(true);
        if (cmpt === undefined){
            return;
        }else{
            components = cmpt;
        }
    }
    var target = "";

    var tags = '';
    var tgs =await getTags();
    if (tgs !== undefined){
        tags = tgs;
    }

    */

    var d = "---\r\n"+
            "id: "+await utilities.getID()+"\r\n"+
            "title: "+title+"\r\n"+
            // "tags: "+ tags + "\r\n"+
            "component: "+components+"\r\n"+ 
            "topictype: "+type+"\r\n"+ options +
            "---\r\n";
            

    if (editor) {
        editor.edit(editBuilder => {
            const selection = editor.selection;
            var l = editor.document.lineAt(selection.start).lineNumber;
            var p = new vscode.Position(0, 0);
            
            if (type === 'Customer Issue'){
               d = d + "\r\n";
               d = d + "# SUMMARY\r\n";
               d = d + "[Jira Summary]\r\n\r\n";
               d = d + "# DESCRIPTION";
            }
            editBuilder.insert(p, d+"\r\n");
            //editor.selection = 
        });
    }

}
export async function insertRequirement(){
    vseditor.insert("### REQ-"+await utilities.getID()+ " - ");
}

export async function insertTip(){insertAdmonition("Tip");}
export async function insertWarning(){insertAdmonition("Warning");}
export async function insertNote(){insertAdmonition("Note");}
export async function insertInfo(){insertAdmonition("Info");}


export async function insertAdmonition(type: string){
    const editor = vscode.window.activeTextEditor;
    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert a Tip, you must open a folder first');
    }
    var title = await vscode.window.showInputBox({ placeHolder: type+ " title", prompt: "Please enter " + type + " title" }) as string;
    if (title === '') {title = type;}
    var msg = await vscode.window.showInputBox({ placeHolder: "Message", prompt: "Please enter your message" }) as string;
    vseditor.insertLine("```"+type+"|"+title+"\r\n"+msg+"\r\n```\r\n");
}

export async function insertTable(){
    const editor = vscode.window.activeTextEditor;
    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert an ID, you must open a folder first');
    }
    
    const result = await vscode.window.showQuickPick(['2x2 Grid', '3x2 Grid', '4x2 Grid', '5x2 Grid'], {
		placeHolder: 'Please select a Grid Size'
		//onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
	});

    if (result === undefined){return;}

    var d1 = "|one|two|\r\n";
    var d2 = "|---|:-:|\r\n";
    var d3 = "|Value 1|Value 2|\r\n\r\n";
    var f = "*Table "+await utilities.getID()+ "* - ";


    if (result === '3x2 Grid'){
        var d1 = "|one|two|three|\r\n";
        var d2 = "|---|:-:|--:|\r\n";
        var d3 = "|Value 1|Value 2|value 3|\r\n\r\n";
    }
    if (result === '4x2 Grid'){
        var d1 = "|one|two|three|four|\r\n";
        var d2 = "|---|:-:|:-:|--:|\r\n";
        var d3 = "|Value 1|Value 2|value 3|value 4|\r\n\r\n";
    }
    if (result === '5x2 Grid'){
        var d1 = "|one|two|three|four|five|\r\n";
        var d2 = "|---|:-:|:-:|:-:|--:|\r\n";
        var d3 = "|Value 1|Value 2|value 3|value 4|value 5|\r\n\r\n";
    }

    vseditor.insert(d1 + d2+ d3+ f);

}
export async function insertImage(){
    const editor = vscode.window.activeTextEditor;

    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert an ID, you must open a folder first');
    }
    const result = await vscode.window.showQuickPick(['Full Size', '100 px', '200 px', '300 px', '400 px', '500 px', '600 px', '700 px'], {
		placeHolder: 'Please select an Image Width (100px == 1 inch == 250 mm)'
	});

    if (result === undefined){return;}
    var s = "img";
    
    if (result === '100 px'){s = "img_100";}
    if (result === '200 px'){s = "img_200";}
    if (result === '300 px'){s = "img_300";}
    if (result === '400 px'){s = "img_400";}
    if (result === '500 px'){s = "img_500";}
    if (result === '600 px'){s = "img_600";}
    if (result === '700 px'){s = "img_700";}
    var f = "*Fig. "+await utilities.getID()+"* - ";

    vseditor.insert("![img:::"+s+"](/wwwroot/images/placeholders/"+s+".png)\r\n\r\n" + f);
    
}

export async function insertStory(){
    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To create a Story you must open a folder first');
    }
    const title = await vscode.window.showInputBox({ placeHolder: "Story Title", prompt: "Please enter your Story Title" }) as string;
    //var c = await addComponents(true);
    var c = "Warranty";

    if (c === undefined){return;}
    var compcode = await getComponentCode(c);
    var uc = "## UC-"+compcode+await utilities.getID() + " - "+title+"\r\n";
    const options = [
        {
			label: 'New Feature for Base',
			description: '- Feature will be added to Base',
			command: '`New'
		},
        {
			label: 'Already Exists in Base',
			description: '- An existing Feature',
			command: '`Base'
		},		
        {
			label: 'Customer Specific Integration to another System',
			description: '- Integration will NOT be added to Base',
			command: '`Integration'
		},
        {
			label: 'Customer Extension',
			description: '- Extension will NOT be added to Base',
			command: '`Extension'
		}
    ];
    const result = await vscode.window.showQuickPick(options, {
		placeHolder: 'What type of User Story is this?'
	});

    if (result === undefined){return;}

    var tus = result?.command as string;

    //if (tus !== '`Base`'){ //get an estimate if not in base
        const resultEffort = await vscode.window.showQuickPick(['Small - Days', 'Medium - a Week', 'Large - a Sprint', 'XLarge - Sprints', 'XXLarge - > 2 Sprints'], {
            placeHolder: 'Effort?'
            //onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
        });
        var e = 'M';
        if (resultEffort !== undefined){
            if (resultEffort === 'Small - Days'){e = 'S';}
            if (resultEffort === 'Medium - a Week'){e = 'M';}
            if (resultEffort === 'Large - a Sprint'){e = 'L';}
            if (resultEffort === 'XLarge - Sprints'){e = 'XL';}
            if (resultEffort === 'XXLarge - > 2 Sprints'){e = 'XXL';}


        }
        if (resultEffort === undefined){
            return;
        }

        //const resultPlatform = await getPlatform("Platform");
        var resultPlatform = "W";
        if (resultEffort === undefined){
            resultPlatform;
        }
        tus = tus + "|" + e + "|" + resultPlatform + '`';
    //}



    uc = uc + tus + "\r\n";
    uc = uc + "\r\n";
    uc = uc + "As a ";
    
    //var a = await getActors();
    var a = "New Actor";
    if (a === undefined){return;}

    uc = uc + a;

    uc = uc + " I need to be able to ";
				 //"`Base` `New` or `Integration` `Extension`\r\n"+
				 //"\r\n"+
                 //"As a ``, I need to \r\n";


	vseditor.insert(uc);
}
export async function getComponentCode(val:string){

    if (val.includes(",")){
        var i = val.split(",");
        val = i[0].trim();
    }
    
}
export async function insertTask(){
    const editor = vscode.window.activeTextEditor;

    if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showErrorMessage('No folder or workspace opened', 'To Insert an ID, you must open a folder first');
    }
    var ttask = await vscode.window.showInputBox({ placeHolder: "Task", prompt: "Please enter the Task Title" }) as string;
    
    if (ttask !== ''){
        vseditor.insert('- [ ] ' + ttask);
    }
}