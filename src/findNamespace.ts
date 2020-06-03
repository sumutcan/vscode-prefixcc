import Axios from 'axios';
import * as vscode from 'vscode';

async function call(request: string) : Promise<any>
{
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

async function getNamespace (prefix: string) : Promise<any> {
   
    const body = await call("http://prefix.cc/"+prefix+".file.json");

    if (!body)
        throw new Error("No prefix found");
    
    return body[prefix];
}

export const nameSpace = () => { 
    
findNamespace("shacl")

};



async function findNamespace(prefix: string) {
       
    vscode.window.showInformationMessage( await getNamespace(prefix));
      

}