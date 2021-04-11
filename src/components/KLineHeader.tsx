import * as React from "react";
import {makeStyles, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: window.innerHeight,
        overflow: "scroll",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

type Props = {
    name: string;
    symbols: any[];
    onClick: (name: string) => void;
};
export const KLineHeader = (props: Props) => {
    const classes = useStyles();
    const {name, symbols, onClick} = props;
    return (
        <div className={classes.root}>
            {symbols.map((e) => {
                const isActive = name === e;
                return (
                    <Button
                        key={e.symbol}
                        size={"small"}
                        variant="outlined"
                        color={isActive ? "secondary" : "primary"}
                        onClick={() => onClick(e.symbol)}
                    >
                        {e}
                    </Button>
                );
            })}
        </div>
    );
};
