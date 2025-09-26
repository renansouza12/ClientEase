export interface Client {
    id?:string,
    name: string;
    plan: string;
    startDate: Date;
    endDate: Date;
    phoneNumber?: string; 
    order?:number;
}
