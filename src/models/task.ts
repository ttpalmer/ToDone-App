import { Tasks } from './task';
export interface Tasks
{
    description?: string;
    goalID?: string;
    priority?: number;
    checked?: boolean;
    taskID?: string;

    
}
export class Task{ 
    constructor(){}
    getIndex(tasks:Tasks[]): number
    {
    
        let index;
        const data: Tasks[] = [];
        for(let i =0; i < tasks.length; i++)
        {
            index = tasks[i];
        }
        return index;
    }
    }