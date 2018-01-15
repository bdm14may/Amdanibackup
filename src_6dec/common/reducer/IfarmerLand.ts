export interface Ifaremerland {
    id: number;
    farmerId: number;
    villageId: number
    cropId: number
    varietyId: number
    sowingDate: number
    harvestDate: number	
    lastdate:number
    seasonId: number
    irrigationId: number,
    coordinates: [{
        lat: number;
        lng: number;
    }]


}
