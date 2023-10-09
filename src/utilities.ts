import * as path from 'path';
import * as fs from 'fs';
//import * as fse from 'fs-extra';
import { spawn } from 'child_process';

//Unique ID Logic
export async function getID():Promise<string>{

	var id = 0;
	var d = new Date();
	var usecs = Math.round(d.getTime() / 1000);
	return  usecs.toString(36).toUpperCase();
}