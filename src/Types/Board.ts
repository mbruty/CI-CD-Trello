export type Board = {
    name: string;
    listPosition: number;
    itmes: Array<BoardItem>;

}

export type BoardItem = {
    name: string;
    itemPosition: number;
}