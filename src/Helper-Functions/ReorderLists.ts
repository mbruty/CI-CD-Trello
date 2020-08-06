import { ListType } from '../Types/List';

export function reorder(array: Array<ListType>){
    let newArray: Array<ListType> = new Array(array.length - 1);
    array.forEach(list => {
        newArray[list.listPosition] = list;
    });
    return newArray;
}