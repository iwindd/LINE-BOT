import { ReplyableEvent, Message } from "@line/bot-sdk";
import { LineApp } from "../app";
import { CommandCallback } from "./typings";
import { LineUser } from "../../lib/user";
import { Command } from "./command";
import fs from "fs";
import path from "path";
import { dialogue } from "../../lib/typings";

const commands: Command[] = [];

export interface CommandBase {
    App: LineApp,
    Event: ReplyableEvent,
    User: LineUser,
    Reply: (msg: Message | Message[]) => void,
    ReplyText: (msg: string) => void,
}

export interface CommandRegis{
    name: string,
    dialogue: dialogue,
    aliases : string[],
    description: string,
    callback: CommandCallback
}

const Add = (command : CommandRegis) => {
    return commands.push(new Command(command.name, command.callback, command.aliases || [], command.dialogue, command.description))
}

const loadCommandsFromDirectory = (directoryPath : string) => {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            loadCommandsFromDirectory(filePath);
        } else if (file.endsWith('.ts')) {
            const commandModule = require(filePath);
            if (commandModule && commandModule.default) {
                const command = commandModule.default;
                Add(command);
            }
        }
    });
}

export const isCommand = (aliases: string) : Command | undefined => {
    return commands.find(c => c.aliases.includes(aliases))
}

export const init = () => {
    loadCommandsFromDirectory(path.join(__dirname, "./commands/hotel"))
};