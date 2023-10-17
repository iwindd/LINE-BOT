import { CommandRegis } from '../..';
import { useContext } from '../../../../lib/lib';
import { flexMenu } from '../../../../lib/message/flexMenu';

export default {
    name: "booking",
    dialogue: "booking",
    description: "booking",
    aliases: [],
    contexts: [
        {
            name: "EndPicker",
            cb: (base, args) => {
                const [userId, roomTitle, startDate] = args as any;
                const menu = new flexMenu(`จองห้อง ${roomTitle}`)
                menu.setTitleAlign("center");
                menu.add({
                    title: "วันที่จะออกจากที่พัก",
                    metadata: [
                        {
                            style: "list",
                            label: `วันที่เริ่มเข้าพัก`,
                            value: startDate,
                            scale: [1, 1]
                        },
                        {
                            style: "button",
                            label: "เลือก",
                            action: {
                                label: "เลือก",
                                type: "datetimepicker",
                                mode: "date",
                                data: useContext('booking.Checking', userId, roomTitle, startDate)
                            }
                        }
                    ]
                })

                base.Reply(menu.render())
            }
        },
        {
            name: "Checking",
            cb: (base, args) => {
                const [userId, roomTitle, startDate, endDate] = args as any;

                const menu = new flexMenu(`จองห้อง ${roomTitle}`)
                menu.setTitleAlign("center");
                menu.add({
                    title: "รายละเอียด",
                    metadata: [
                        {
                            style: "list",
                            label: `วันที่เริ่มเข้าพัก`,
                            value: startDate,
                            scale: [1, 1]
                        },
                        {
                            style: "list",
                            label: `วันที่ออกที่พัก`,
                            value: endDate,
                            scale: [1, 1]
                        },
                        {
                            style: "button",
                            label: "ยืนยัน",
                            action: {
                                label: "ยืนยัน",
                                type: "postback",
                                data: useContext('booking.sendTicket', userId, roomTitle, startDate, endDate)
                            }
                        }
                    ]
                })

                base.Reply(menu.render())
            }
        },
        {
            name: "sendTicket",
            cb: (base, args) => {
                base.ReplyText("กำลังดำเนินเรื่องให้นะคะ :>")
            }
        }
    ],
    callback: async (base, args) => {
        const [userId, roomTitle]: [string, string] = args as any;

        const menu = new flexMenu(`จองห้อง ${roomTitle}`);
        menu.setTitleAlign("center")
        menu.add({
            title: "วันที่จะเข้าพัก",
            metadata: [
                {
                    style: "button",
                    label: "เลือก",
                    action: {
                        label: "เลือก",
                        type: "datetimepicker",
                        mode: "date",
                        data: useContext('booking.EndPicker', userId, roomTitle)
                    }
                }
            ]
        })

        base.Reply(menu.render())
    },
} as CommandRegis;