import React, { useEffect, useState } from "react"

interface Data {
    name: string
    symbols: string[]
}

const Item = ({ data, onChange, position }: { data: Data, onChange: (index: number, field: "name" | "symbols", data: string) => void, position: number }) => {
    const { name, symbols } = data
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap"
        }}>
            <label style={{
                width: "100%",
                maxWidth: "100%",
                paddingRight: 5,
                paddingLeft: 5,
                flex: "1 0 0%"
            }}>
                <input value={name} placeholder="Name" onChange={e => onChange(position, "name", e.target.value)} />
            </label>
            <label style={{
                width: "100%",
                maxWidth: "100%",
                paddingRight: 5,
                paddingLeft: 5,
                flex: "1 0 0%"
            }}>
                <input value={symbols.join(",")} placeholder="Symbols" onChange={e => onChange(position, "symbols", e.target.value)} />
            </label>
        </div>
    )
}

const App = () => {
    const [data, setData] = useState<Data[]>([])
    const [pin, setPin] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (loading) {
            chrome.storage.sync.get(["stock_data", "pin"], (result) => {
                console.log(result.stock_data)
                setData(result.stock_data || [])
                setPin(result.pin || "")
                setLoading(false)
            })
        }
    })

    const submit = (): void => {
        chrome.storage.sync.set({ stock_data: data, pin: pin }, () => {
            chrome.storage.sync.get(["stock_data", "pin"], (result) => {
                setData(result.stock_data || [])
                setPin(result.pin)
                console.log("data saved", result)
            })
        })
    }

    const add = (e: any): void => {
        setData([...data, ...[{ name: "", symbols: [] }]])
    }

    const onChange = (index: number, field: "name" | "symbols", value: string): void => {
        switch (field) {
            case "name":
                data[index].name = value
                break
            case "symbols":
                data[index].symbols = value.split(",")
                break
        }

        setData([...data])
    }

    if (loading) {
        return null
    }

    console.log(data)

    return (
        <div>
            <div style={{ marginLeft: 5 }}>
                <input value={pin} placeholder="Pin" onChange={e => setPin(e.target.value)} />
            </div>
            <div style={{ marginTop: 10}}>
                {data.map((v, i) => <Item data={v} position={i} onChange={onChange} />)}
            </div>
            <button onClick={add} style={{
                marginLeft: 5,
                marginTop: 10
            }}>Add</button>
            <button onClick={submit} style={{
                marginLeft: 5,
                marginTop: 10
            }}>Save</button>
        </div>
    )
}

export default App