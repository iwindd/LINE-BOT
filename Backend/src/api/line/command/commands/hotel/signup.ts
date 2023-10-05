import { CommandRegis } from '../..';
import aliases from '../../aliases/hotel/signup.json';

export interface Signup {
    [0]: string; // name
    [1]: string; // information
}

export default {
    name: "signup",
    dialogue: "registration",
    description: "registration",
    aliases: aliases,
    callback: ({ User, ReplyText }, args) => {
        const name = args[0];
        const info = args[1];

        switch (User.data.state) {
            case 0: // GUEST
                if (!name) return ReplyText("กรุณาป้อนชื่อเพื่อเข้าใช้งานด้วยนะคะ!");
                if (!info) return ReplyText("กรุณาป้อนข้อมูลเพิ่มเติ่ม เช่น ตำแหน่ง เข้าไปหลังจากป้อนชื่อด้วยนะคะ!");
                ReplyText("กำลังดำเนินการขอเข้าใช้งานให้นะคะ :>");

                User.update({
                    state: 1,
                    info: info,
                    title: name
                }).catch(() => {
                    ReplyText("เกิดข้อผิดพลาดในการขอเข้าใช้งานค่ะ :(\nกรุณาลองอีกครั้งภายหลังนะคะ:(((");
                })
                
                break;
            case 1: // WAITING

                ReplyText("ตอนนี้กำลังยื่นการขอดำเนินเข้าใช้ให้ค่ะ กรุณารอก่อนนะคะ :))");
                break;
            case 2 || 3: // USER && ADMIN

                ReplyText("คุณถูกทำการอนุญาตเข้าใช้งานแล้วค่ะ :))");
                break;
            case -1: // BLACKLIST

                ReplyText("ขออภัยค่ะ คุณไม่ทีสิทธิ์เข้าใช้งาน!");
                break;
            default: // don't know state
                ReplyText("มีอะไรสักอย่างผิดพลาดค่ะ กรุณาลองอีกครั้งภายหลังนะคะ :(");
                break;
        }
    },
} as CommandRegis;