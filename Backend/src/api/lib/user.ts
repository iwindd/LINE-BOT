import UserModel, { IUser } from "../../models/UserModel";
import { LineApp } from "../line/app";
import { dialogue } from "./typings";

const Users: LineUser[] = [];
const verifyCache: IUser[] = [];

export const getUser = async (userId: string, app: LineApp) => {
    const user = await verifyUser(userId, app) as IUser;

    return Users.find((user) => user.data._id == userId) ? (
        Users.find((user) => user.data._id == userId)
    ) : (
        new LineUser(user)
    );
}

export const verifyUser = async (userId: string, app: LineApp) => {
    return new Promise((resolve, reject) => {
        const appId = app.id;
        const cache = verifyCache.find((user) => user._id == userId);

        if (!cache) {
            UserModel.findOne({ userId: userId, appId: appId }).then(async (user) => {
                if (user) {
                    verifyCache.push(user)

                    resolve(user)
                } else {
                    const { displayName } = await app.client.getProfile(userId);
                    const user = await UserModel.create({
                        userId,
                        appId: appId,
                        title: displayName
                    })

                    verifyCache.push(user)
                    resolve(user)
                }
            }).catch(reject)
        } else {
            resolve(cache);
        }
    })
}

export class LineUser {
    public data: IUser;
    public dialogue: dialogue | undefined;

    constructor(user: IUser) {
        this.data = user;
    }

    /**
     * useDialogue
     */
    public useDialogue(dialogue: dialogue) {
        this.dialogue = dialogue
    }

    /**
     * update
     */
    public update(data: any, options: any = {}) {
        return UserModel.findByIdAndUpdate(this.data._id, data, options)
    }

    /**
     * StateFor
     */
    public StateFor(states : number[]) {
        return states.find(state => state == this.data.state)
    }

}