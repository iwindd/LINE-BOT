import { Add } from "..";
import aliases from '../aliases/signup.json';

export interface Signup {
    [0]: string; // name
    [1]: string; // information
}

export default {
    name: "signup",
    callback: () => {
        console.log("OK")
    },
    aliases: aliases,
};