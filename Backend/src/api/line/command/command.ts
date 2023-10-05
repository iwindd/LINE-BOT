import { Message, ReplyableEvent } from "@line/bot-sdk";
import { LineApp } from "../app";
import { Args, CommandCallback } from "./typings";
import { LineUser } from "../../lib/user";
import { dialogue } from "../../lib/typings";
import { CommandBase } from ".";


export type ContextCallback = (CommandBase: CommandBase, ...args: any) => void
interface Context {
    name: string,
    cb: ContextCallback
}

export class Command {
    public name: string;
    public description: string;
    public aliases: string[];
    public callback: CommandCallback;
    public dialogue: dialogue;
    private contexts: Context[] = [];

    constructor(name: string, callback: CommandCallback, aliases: string[], dialogue: dialogue, description?: string) {
        this.name = name;
        this.callback = callback;
        this.aliases = aliases;
        this.dialogue = dialogue;
        this.description = description || "";
    }

    /**
     * RegisterContext
     */
    public RegisterContext(name: string, cb: ContextCallback) {
        console.log('push Context', name);
        
        this.contexts.push({
            name: name,
            cb: cb
        })
    }

    /**
     * useContext
     */
    public useContext(App: LineApp, Event: ReplyableEvent, User: LineUser, name: string, ...args: any) {
        console.log('useContext', this.name, name, this.contexts);

        return this.contexts.find(c => c.name === name) ? (
            this.contexts.find(c => c.name === name)?.cb(
                {
                    App,
                    Event,
                    User,
                    Command: this,
                    Reply: (payload: Message | Message[]) => {
                        App.client.replyMessage(Event.replyToken, payload);
                    },
                    ReplyText: (message: string) => {
                        App.client.replyMessage(Event.replyToken, {
                            type: "text",
                            text: message
                        })
                    },
                },
                ...args
            )
        ) : (false);
    }

    public execute(App: LineApp, Event: ReplyableEvent, User: LineUser, args: Args) {
        User.useDialogue(this.dialogue);

        return this.callback({
            App,
            Event,
            User,
            Command: this,
            Reply: (payload: Message | Message[]) => {
                App.client.replyMessage(Event.replyToken, payload);
            },
            ReplyText: (message: string) => {
                App.client.replyMessage(Event.replyToken, {
                    type: "text",
                    text: message
                })
            }
        }, args);
    }
}