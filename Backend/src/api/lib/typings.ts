export type dialogue = "registration" 
    | "getRooms"
    | "booking"

export interface Context {
    commandName : string,
    contextName : string,
    args: Array<string | number | boolean>
}