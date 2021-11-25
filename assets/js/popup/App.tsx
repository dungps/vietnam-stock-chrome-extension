import React, { useEffect, useState } from "react"

const Item = (props: any) => {
    const { data } = props

    return (
        <li>
            <a href={data.Link} target="_blank">{data.Symbol}</a>
            <span style={{
                color: data.UpDown === 1 ? "red" : "green",
                marginLeft: "10"
            }}>{data.Price}</span>
        </li>
    )
}

const Items = (props: any) => {
    const { data } = props

    return (
        <li>
            <h3>{data.name}</h3>
            <ul>
                {data.data.map((v: any, k: any) => <Item data={v} key={k} />)}
            </ul>
        </li>
    )
}

const App = () => {
    const [data, setData] = useState<any>([])
    const [pin, setPin] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (loading) {
            chrome.storage.sync.get("stock_data", async (result) => {
                let rawData: any = []
                if (result.stock_data && result.stock_data.length > 0) {
                    rawData = result.stock_data
                    for (let i = 0; i < rawData.length; i++) {
                        for (let macp of rawData[i].symbols) {
                            try {
                                const resp = await fetch(`https://e.cafef.vn/info.ashx?type=cp&symbol=${macp}`)
                                const body = await resp.json()

                                if (!rawData[i].data) {
                                    rawData[i].data = []
                                }

                                rawData[i].data.push(body)
                            } catch(e: any) {
                                console.log("error message", e.message)
                            }
                        }
                    }
                }

                setData([...rawData])
                setTimeout(() => setLoading(false), 2000)
            })
        }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    const display = []

    for (let i = 0; i < data.length; i++) {
        display.push(<Items data={data[i]} pin={pin} key={i} />)
    }

    return (
        <div style={{ width: "300px", height: "200px" }}>
            <ul style={{ listStyle: "none", marginLeft: 0, paddingLeft: 0 }}>
                {display}
            </ul>
        </div>
    )
}

export default App