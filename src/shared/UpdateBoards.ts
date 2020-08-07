import { ListType } from './List';
import axios from 'axios';
export function setBoard(boards: Array<ListType>): Promise<string> {
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

export function updateBoard(boardID: string, listArr: Array<ListType>): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        try{
            axios.put("http://localhost:5000/board/" + boardID, {
                boardID: boardID,
                lists: listArr
            })
			.then(response => {
				resolve(response.toString());
			})
        } catch(e) {
            reject(e);
        }
    })
}