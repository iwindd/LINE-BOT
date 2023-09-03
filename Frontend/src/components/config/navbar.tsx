import { Dashboard, People, Reply, Room, Settings } from "@mui/icons-material"

interface DrawerItem{
    name: string,
    route: string,
    icon: JSX.Element
}

interface DrawerCategory{
    name: string,
    items: DrawerItem[]
}

export const DrawerItems : DrawerCategory[] = [
    {
        name: "main",
        items: [
            {
                name: "dashboard",
                route: "/",
                icon: <Dashboard/>
            },
            {
                name: "users",
                route: "/users",
                icon: <People/>
            },
            {
                name: "rooms",
                route: "/rooms",
                icon: <Room/>
            }
        ]
    },
    {
        name: "config",
        items: [
            {
                name: "reply",
                route: "/reply",
                icon: <Reply/>
            },
            {
                name: "synthia",
                route: "/synthia",
                icon: <Settings/>
            }
        ]
    }
]