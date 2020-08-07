export type ListType = {
    id: number;
    name: string;
    listPosition: number;
    items: Array<CardType>;

}

export type CardType = {
    id: number,
    name: string;
    //Label will be a hex string
    label?: Array<number>;
    //Should be a date object, but the request from api will return a string
    due?: string;
    complete: boolean;
    itemPosition: number;
}