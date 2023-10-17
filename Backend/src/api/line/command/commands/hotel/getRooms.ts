import { CommandRegis } from '../..';
import * as HRoom from '../../../../../controllers/Hotel/RoomController'
import { IHRoom } from '../../../../../models/Hotel/RoomModel';
import { useContext } from '../../../../lib/lib';
import aliases from '../../aliases/hotel/getRoom.json';
import RoomModel from '../../../../../models/Hotel/RoomModel';

export default {
    name: "getRooms",
    dialogue: "getRooms",
    description: "getRooms",
    aliases: aliases,
    contexts: [
        {
            name: "room",
            cb: ({ Reply, ReplyText }, args) => {
                const title = args[1];
                RoomModel.findById(args[0]).then((room) => {
                    Reply([
                        {
                            type: "text",
                            text: `นี้คือข้อมูลเพิ่มเติมของห้อง ${title} ค่ะ :))`
                        },
                        {
                            type: "flex",
                            altText: `ข้อมูลห้อง ${title}`,
                            contents: {
                                type: 'bubble',
                                hero: {
                                    type: 'image',
                                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                                    size: 'full',
                                    aspectRatio: '20:13',
                                },
                                body: {
                                    type: 'box',
                                    layout: 'vertical',
                                    contents: [
                                        {
                                            type: 'text',
                                            text: title,
                                            weight: 'bold',
                                            size: 'xl',
                                        },
                                    ],
                                },
                                footer: {
                                    type: 'box',
                                    layout: 'vertical',
                                    contents: [
                                        {
                                            type: 'button',
                                            action: {
                                                type: "postback",
                                                label: "action",
                                                data: useContext("booking", args[0], title)
                                            }
                                        },
                                    ],
                                },
                            }
                        }
                    ])
                }).catch(() => {
                    ReplyText(`ขออภัยค่ะ ไม่พบข้อมูลห้อง${title} :<`)
                })
            }
        }
    ],
    callback: async ({ User, Reply, ReplyText, App }) => {
        if (!User.StateFor([2, 3])) return ReplyText("ขออภัยค่ะ คุณไม่มีสิทธิเข้าถึงบริการนี้ :(");

        const items: any = []
        const hrooms = await HRoom.get(App.id)

        hrooms.map((room: IHRoom) => {
            items.push({
                type: 'bubble',
                hero: {
                    type: 'image',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                    size: 'full',
                    aspectRatio: '20:13',
                },
                body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'text',
                            text: room.title,
                            weight: 'bold',
                            size: 'xl',
                        },
                    ],
                },
                footer: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'button',
                            action: {
                                type: "postback",
                                label: "action",
                                data: useContext('getRooms.room', room._id, room.title)
                            }
                        },
                    ],
                },
            })
        })

        Reply({
            type: 'flex',
            altText: "นี้คือห้องทั้งหมดค่ะ :)",
            contents: {
                type: 'carousel',
                contents: items,
            },
        })
    },
} as CommandRegis;