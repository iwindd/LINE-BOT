import { Message, ReplyableEvent } from "@line/bot-sdk";
import { LineApp } from "../app";
import { Args, CommandCallback } from "./typings";
import { LineUser } from "../../lib/user";
import { dialogue } from "../../lib/typings";

export class Command {
    public name: string;
    public description: string;
    public aliases: string[];
    public callback: CommandCallback;
    public dialogue: dialogue;

    constructor(name: string, callback: CommandCallback, aliases: string[], dialogue: dialogue, description?: string) {
        this.name = name;
        this.callback = callback;
        this.aliases = aliases;
        this.dialogue = dialogue;
        this.description = description || "";
    }

    public execute(App: LineApp, Event: ReplyableEvent, User: LineUser, args: Args) {
        User.useDialogue(this.dialogue);

        return this.callback({
            App,
            Event,
            User,
            Reply: (payload: Message | Message[]) => {
                App.client.replyMessage(Event.replyToken, payload);
            },
            ReplyText: (message) => {
                App.client.replyMessage(Event.replyToken, {
                    type: "text",
                    text: message
                })
            }
        }, args);
    }
}