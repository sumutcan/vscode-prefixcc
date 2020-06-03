import Axios from 'axios';
import * as vscode from 'vscode';

async function call(request: string): Promise<any> {
    const axios = Axios.create();
    let conf = {
        headers: {
            "Accept": "application/json"
        }
    };

    const response = await axios.get(request, conf);
    console.log(response);
    return response.data;
}

async function getNamespace(prefix: string): Promise<any> {

    const body = await call("http://prefix.cc/" + prefix + ".file.json");

    if (!body)
        throw new Error("No prefix found");

    return body[prefix];
}

export function nameSpace () {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const range = editor.document.getWordRangeAtPosition(editor.selection.active);
        const prefix = editor.document.getText(range);
        findNamespace(prefix.replace("\s*\p{Punct}+\s*$",""), editor);
    }

};


async function findNamespace(prefix: string, editor: vscode.TextEditor) {

    const nameSpaceEdit = new vscode.WorkspaceEdit();
    
    const namespaceUri = await getNamespace(prefix);

    const start = editor.selection.end.character+1;
    
    nameSpaceEdit.insert(editor.document.uri, new vscode.Position(editor.selection.end.line, start), " <"+namespaceUri+">")
    
    vscode.window.showInformationMessage("Prefix.cc: "+namespaceUri);

    vscode.workspace.applyEdit(nameSpaceEdit).then(() => {
        editor.document.save();
    });


}