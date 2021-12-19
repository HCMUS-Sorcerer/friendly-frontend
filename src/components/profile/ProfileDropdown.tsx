import * as React from "react";
import classes from "./ProfileDropdown.module.css";

interface DummyData {
    id: number;
    title: string;
}

export default function ProfileDropdowm() {
    const [list, setList] = React.useState([
        {
            id: 1,
            title: "Profile",
        },
        {
            id: 2,
            title: "Settings",
        },
        {
            id: 3,
            title: "Log out",
        },
    ] as DummyData[]);

    const renderItem = React.useCallback(() => {
        return list.map((item) => {
            return (
                <li className={classes["dropdown-item"]} key={Number(item.id)}>
                    {item.title}
                </li>
            );
        });
    }, []);

    return <ul className={classes.dropdown}>{renderItem()}</ul>;
}
