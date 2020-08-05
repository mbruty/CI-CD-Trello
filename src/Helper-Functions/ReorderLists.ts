import { List } from '../Types/List';

export function reorder(array: Array<List>){
    let newArray: Array<List> = new Array(array.length - 1);
    array.forEach(list => {
        newArray[list.listPosition] = list;
    });
    return newArray;
}