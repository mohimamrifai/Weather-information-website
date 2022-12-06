import React, { useEffect, useState } from 'react'

const Magnitudo = () => {

    const [srcMap, setSrcmap] = useState("")
    const [gempa, setGempa] = useState({})

    const {koordinat, dirasakan, jam, tanggal, kedalaman, wilayah, magnitude} = gempa;

    const getGempaInfo = async () => {
        const { data } = await fetch("https://cuaca-gempa-rest-api.vercel.app/quake")
            .then(res => res.json())
            .catch(err => console.log(err))
        setGempa({
            koordinat: data.coordinates,
            dirasakan: data.dirasakan,
            jam: data.jam,
            tanggal: data.tanggal,
            kedalaman: data.kedalaman,
            wilayah: data.wilayah,
            magnitude: data.magnitude
    
        })
        setSrcmap(`https://www.google.com/maps?q=${data.coordinates}&hl=es;z=14&output=embed`)
    }

    useEffect( () => {
        getGempaInfo()
    }, [])
    return (
        <div className="main">
            <span style={{ marginBottom: 10, display: "inline-block", color: "white" }}>Info gempa terakhir</span>
            <div className="card_gempa">
                <iframe className='maps' title="maps" src={srcMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <h2 className='gempa_title'>{wilayah}</h2>
                <p style={{marginBottom: "15px"}}>{tanggal} | {jam}</p>
                <div className="gempa_content">
                    <div className="gempa_content_left">
                        <div className="koordinat">
                            <h4>Koordinat</h4>
                            <p>{koordinat
                            }</p>
                        </div>
                        <div className="kedalaman">
                            <h4>Kedalaman</h4>
                            <p>{kedalaman}</p>
                        </div>
                    </div>
                    <div className="gempa_content_right">
                        <div className="magnitudo">
                            <h4>Magnitude</h4>
                            <span>{magnitude}</span>
                        </div>
                    </div>
                </div>
                <p>{String(dirasakan).slice(0, 60)}</p>
            </div>
        </div>
    )
}

export default Magnitudo
