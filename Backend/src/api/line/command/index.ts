import { ReplyableEvent, Message } from "@line/bot-sdk";
import { LineApp } from "../app";
import { CommandCallback } from "./typings";
import { LineUser } from "../../lib/user";
import { Command, ContextCallback } from "./command";
import fs from "fs";
import path from "path";
import { dialogue } from "../../lib/typings";

const commands: Command[] = [];

export interface CommandBase {
    App: LineApp,
    Event: ReplyableEvent,
    User: LineUser,
    Command: Command,
    Reply: (msg: Message | Message[]) => void,
    ReplyText: (msg: string) => void,
}

export interface CommandRegis {
    name: string,
    dialogue: dialogue,
    aliases: string[],
    description: string,
    callback: CommandCallback,
    contexts: {name: string, cb: ContextCallback}[]
}

const Add = (payload: CommandRegis) => {
    const command = new Command(payload.name, payload.callback, payload.aliases || [], payload.dialogue, payload.description);

    if (payload.contexts && payload.contexts.length > 0) {
        payload.contexts.map((context) => command.RegisterContext(context.name, context.cb))
    }

    return commands.push(command)
}

const loadCommandsFromDirectory = (directoryPath: string) => {
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

export const isCommand = (aliases: string): Command | undefined => {
    return commands.find(c => c.aliases.includes(aliases))
}

export const onContext = (CommandName: string, App: LineApp, Event: ReplyableEvent, User: LineUser, ContextName: string, Args: string) => {
    const command = commands.find(c => c.name == CommandName);

    return command ? command.useContext(App, Event, User, ContextName, Args) : false
}

export const init = () => {
    loadCommandsFromDirectory(path.join(__dirname, "./commands/hotel"))
};