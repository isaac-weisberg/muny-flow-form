import { useCallback, useEffect, useState } from "react"

export function useStatementIncomeTable(
    storageKey: string
) {
    interface TableEntry {
        id: string,
        name: string,
        value?: number
    }

    const initialTable: TableEntry[] = [
        {
            id: Date.now().toString(),
            name: "",
            value: undefined
        }
    ]

    const [entries, setEntries] = useState([] as TableEntry[])

    useEffect(() => {
        try {
            const storageString = localStorage.getItem(storageKey)
            if (!storageString) {
                setEntries(initialTable)
            } else {
                const parsed = JSON.parse(storageString)
                setEntries(parsed) // Type-checking, hello?
            }
        } catch(error) {
            console.error(error)
            setEntries(initialTable)
        }
    }, [])

    useEffect(() => {
        try {
            const json = JSON.stringify(entries)
            localStorage.setItem(storageKey, json)
        } catch(error) {
            console.error(error)
        }
    }, [entries])

    const setEntryName = useCallback((id: string, value: string) => {
        const relevantEntry = entries.find(entry => entry.id == id)

        if (!relevantEntry) {
            return
        }

        relevantEntry.name = value

        setEntries(entries.slice())
    }, [entries])

    const setEntryValue = useCallback((id: string, value: string) => {
        const relevantEntry = entries.find(entry => entry.id == id)

        if (!relevantEntry) {
            return
        }
        
        const parsedNumber = Number.parseInt(value)

        let resultingNewValue: number|undefined
        if (Number.isNaN(parsedNumber)) {
            resultingNewValue = undefined
        } else {
            resultingNewValue = parsedNumber
        }

        relevantEntry.value = resultingNewValue

        setEntries(entries.slice())
    }, [entries])

    const addNewEntry = useCallback(() => {
        const emptyEntry: TableEntry = {
            id: Date.now().toString(),
            name: "",
            value: undefined
        }

        const newEntries = entries.concat([ emptyEntry ])

        setEntries(newEntries)
    }, [entries])

    const pruneEntries = useCallback(() => {
        const newEntries = entries.filter(entries => {
            return entries.name.length != 0 || entries.value
        })

        setEntries(newEntries)
    }, [entries])

    return {
        entries,
        setEntryName,
        setEntryValue,
        addNewEntry,
        pruneEntries
    }
}