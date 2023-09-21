import { ReplyableEvent, Message } from "@line/bot-sdk";
import { LineApp } from "../app";
import { CommandCallback } from "./typings";
import { Command } from "./command";
import fs from "fs";
import path from "path";

const commands: Command[] = [];

export interface CommandBase {
    App: LineApp,
    Event: ReplyableEvent,
    Reply: (msg: Message | Message[]) => void
}

export const Add = (name: string, cb: CommandCallback, aliases?: string[]) => {
    return commands.push(new Command(name, cb, aliases || []))
}

export const isCommand = (aliases: string) : Command | undefined => {
    return commands.find(c => c.aliases.includes(aliases))
}

export const init = () => {
    const commandsDir = path.join(__dirname, "./commands");

    fs.readdirSync(commandsDir).forEach((file) => {
        if (file.endsWith(".ts")) {
            const commandModule = require(path.join(commandsDir, file));
            if (commandModule && commandModule.default) {
                const command = commandModule.default;
                Add(command.name, command.callback, command.aliases);
            }
        }
    });
};