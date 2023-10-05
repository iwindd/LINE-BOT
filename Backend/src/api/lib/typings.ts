export type dialogue = "registration" 
    |"getRooms"


export interface Context {
    commandName : string,
    contextName : string,
    args: Array<string | number | boolean>
}