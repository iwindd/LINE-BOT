export const CutMessage = (message: String): [string, string[]] => {
    const commandParts = message.split(' ');
    const commandName = commandParts[0];
    const argsString = commandParts.slice(1).join(' ');
    const args = argsString.match(/("[^"]+"|[^"\s]+)/g) || [];
    const cleanedArgs = args.map(arg => arg.replace(/^"(.*)"$/, '$1'));

    return [commandName, cleanedArgs];
}

export const useContext = (commandName: string, ...args: any) => {
    const parts = commandName.split('.');

    return JSON.stringify({
        commandName: parts[0],
        contextName: parts[1],
        args: args
    })
}

export const thaiToArabicNumbers = (thaiNumber: string): string | number => {
    const thaiDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    const arabicDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < thaiDigits.length; i++) {
        thaiNumber = thaiNumber.replace(new RegExp(thaiDigits[i], 'g'), arabicDigits[i]);
    }

    return thaiNumber;
}


export const isThaiNumber = (text : string) : boolean => {
    const thaiNumeralsPattern: RegExp = /[๐-๙]/;
    return thaiNumeralsPattern.test(text);
}
