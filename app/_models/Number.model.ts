export class NumberModel {
    ID: number;
    number: number;
    lempiras: number;
    seller_id: number;
    list_id: number;
    minRangeNumber: number;

    constructor(pID: number, pNumber: number, pLempiras: number, pMinRangeNumber: number, pSellerID: number, pListID: number) {
        this.ID = pID;
        this.number = pNumber;
        this.lempiras = pLempiras;
        this.seller_id = pSellerID;
        this.list_id = pListID;
        this.minRangeNumber = pMinRangeNumber;
    }
}