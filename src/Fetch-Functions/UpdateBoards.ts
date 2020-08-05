import { List } from '../Types/List';

export function setBoard(boards: Array<List>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        resolve("Complete");
    });
}

export function createBoard(board?: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        //ToDo: Fetch from server
        resolve("Complete");
    })
}