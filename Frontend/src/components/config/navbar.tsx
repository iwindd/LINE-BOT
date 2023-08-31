import { Dashboard, People } from "@mui/icons-material"

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
            }
        ]
    }
]