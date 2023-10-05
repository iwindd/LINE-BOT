import { Message } from "@line/bot-sdk"

type style = "list" | "button" | "confirmation"
type align = "start" | "center" | "end"

interface metadata {
    style: style,

    /* LIST */
    value?: string,
    scale?: [number, number]

    /* LIST & BUTTON */
    label?: string,

    /* BUTTON */
    action?: Object,

    /* CONFIRMATION */
    confirmLabel?: string,
    cancelLabel?: string,

    confirm?: Object,
    cancel?: Object
}

interface item {
    title: string,
    metadata: metadata[],
    align?: align,
    onClick?: Object,
}

const createMetadata = (metadata: metadata) => {
    if (metadata.style == "list") {
        return {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
                {
                    "type": "text",
                    "text": metadata.label,
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": !metadata.scale ? 1: metadata.scale[0]
                },
                {
                    "type": "text",
                    "text": metadata.value,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": !metadata.scale ? 5: metadata.scale[1]
                }
            ]
        }
    } else if (metadata.style == "button") {
        return {
            "type": "button",
            "style": "primary",
            "margin": "md",
            "action": {
                "label": metadata.label,
                ...(metadata.action)
            },
        }
    } else if (metadata.style == "confirmation") {
        return {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "button",
                    "style": "primary",
                    "height": "sm",
                    "action": {
                        "label": metadata.confirmLabel || "ตกลง",
                        ...(metadata.confirm)
                    }
                },
                {
                    "type": "button",
                    "height": "sm",
                    "action": {
                        "label": metadata.cancelLabel || "ยกเลิก",
                        ...(metadata.cancel)
                    },
                    "style": "secondary"
                }
            ],
            "spacing": "sm",
            "margin": "md"
        }
    }
}

const createItem = (item: item) => {
    const elements: any = []
    item.metadata.map((metadata) => {
        elements.push(createMetadata(metadata))
    })

    return {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": item.title,
                "weight": "bold",
                "align": item.align || "start",
                "size": "xl"
            },
            {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "spacing": "sm",
                "contents": elements
            }
        ],
        ...(!item.onClick ? {} : {
            "action": item.onClick
        })
    }
}

export class flexMenu {
    private title: string = "untitled";
    private items: item[] = [];
    private align: align = "start";

    constructor(title: string = "untitled") {
        this.title = title
    }

    public setTitle(title: string) {
        this.title = title
    }

    public setTitleAlign(align: align) {
        this.align = align
    }

    public add(item: item) {
        this.items.push(item);
    }

    public isEmpty() {
        return this.items.length <= 0;
    }

    public render(): Message {
        const elements: any = [];

        this.items.map((item, index) => {
            elements.push(createItem(item))

            if (index < this.items.length - 1) {
                elements.push({
                    "type": "separator",
                    "margin": "lg"
                })
            }
        })

        const container: Message = {
            type: "flex",
            altText: this.title,
            contents: {
                type: "bubble",
                header: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            "type": "text",
                            "text": this.title,
                            "weight": "bold",
                            "align": this.align,
                            "wrap": true,
                            "size": "xxl"
                        }
                    ]
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: elements,
                    spacing: "lg"
                }
            }
        }

        return container
    }
}