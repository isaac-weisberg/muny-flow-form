import { ChangeEvent, useState } from "react";

export function FixedStatementField(
    props: {
        title: string
    }
) {
    const [value, setValue] = useState(null as number|null)

    function inputChanged(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const untypedValue = e.target.value

        const parsedInt = Number.parseInt(untypedValue)

        if (Number.isNaN(parsedInt)) {
            setValue(null)
        } else {
            setValue(parsedInt)
        }
    }

    return <div>
        <div>
            {props.title} {value}
        </div>
        <input type="number" value={value || ""} onChange={inputChanged} />
    </div>
}