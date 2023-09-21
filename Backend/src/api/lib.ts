export const CutMessage = (message: String): [string, string[]] => {
    const commandParts = message.split(' ');
    const commandName = commandParts[0];
    const argsString = commandParts.slice(1).join(' ');
    const args = argsString.match(/("[^"]+"|[^"\s]+)/g) || [];
    const cleanedArgs = args.map(arg => arg.replace(/^"(.*)"$/, '$1'));

    return [commandName, cleanedArgs];
}