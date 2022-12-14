import { Ticket } from "../Types/Tickets";



export function createID(Tickets: Ticket[]) : number{
    let id = 0;
    for (let i = 0; i <= Tickets.length; i++) {
        id++;
    }
    return id;
}


  