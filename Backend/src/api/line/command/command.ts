import { Message, ReplyableEvent } from "@line/bot-sdk";
import { LineApp } from "../app";
import { Args, CommandCallback } from "./typings";

export class Command {
    public name: string;
    public description: string;
    public aliases: string[];
    public callback: CommandCallback;

    constructor(name: string, callback: CommandCallback, aliases: string[], description?: string) {
        this.name = name;
        this.callback = callback;
        this.aliases = aliases;
        this.description = description || "";
    }

    public execute(App: LineApp, Event: ReplyableEvent, args: Args) {
        return this.callback({
            App,
            Event,
            Reply: (payload: Message | Message[]) => {
                App.client.replyMessage(Event.replyToken, payload);
            }
        }, args);
    }
}