import { CommandBase } from ".";
import { Signup } from "./commands/hotel/signup";

export type Args = Signup;
export type CommandCallback = (base : CommandBase, args : Args) => void;