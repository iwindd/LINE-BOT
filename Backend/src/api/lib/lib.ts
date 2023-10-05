export const CutMessage = (message: String): [string, string[]] => {
    const commandParts = message.split(' ');
    const commandName = commandParts[0];
    const argsString = commandParts.slice(1).join(' ');
    const args = argsString.match(/("[^"]+"|[^"\s]+)/g) || [];
    const cleanedArgs = args.map(arg => arg.replace(/^"(.*)"$/, '$1'));

    return [commandName, cleanedArgs];
}

export const useContext = (commandName : string, ...args : any) => {
    const parts = commandName.split('.');

    return JSON.stringify({
        commandName: parts[0],
        contextName: parts[1],
        args: args
    })
}