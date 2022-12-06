import React, { useState } from 'react'
import moment from 'moment'
import getIcon from './getIcon'

import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa'


moment.locale("id")

const Cuaca = ({ dataCuaca }) => {


  const { namaDaerah, suhu, suhuMaksimal, suhuMinimum, judul, arrayCuaca } = dataCuaca

  const [tabActive, setTabActive] = useState(1)

  const toggle = (index) => {
    setTabActive(index)
  }

  return (
    <div className="cuaca">
      <div className="container_cuaca">
        <div className="cuaca_left">
          <h2 className='cuaca_title'>{namaDaerah}</h2>
          <p style={{ color: "#4A4A4A", marginTop: "5px" }}>{moment().format('lll')}</p>
           <div className="logo">
            {getIcon(judul)}
           </div>
          <p style={{ color: "#3175F9", fontWeight: "bold", letterSpacing: "1px" }}>{judul}</p>
        </div>
        <div className="cuaca_right">
          <span className='suhu' style={{ color: "#4A4A4A" }}>{suhu}</span>
          <hr />
          <div className="temperatur" style={{ display: "flex", marginTop: "5px", justifyContent: "space-evenly" }}>
            <div className="t_max" style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "5px" }}>
              <FaTemperatureHigh />
              <p>{suhuMaksimal}</p>
            </div>
            <div style={{ width: "2px", backgroundColor: "#4A4A4A" }}></div>
            <div className="t_min" style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "5px" }}>
            <FaTemperatureLow />
              <p>{suhuMinimum}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tabs">
        <div className={tabActive === 1 ? 'tab tab_active' : 'tab'} onClick={() => toggle(1)}>Jam</div>
        <div className={tabActive === 2 ? 'tab tab_active' : 'tab'} onClick={() => toggle(2)}>Hari</div>
        <div className={tabActive === 3 ? 'tab tab_active' : 'tab'} onClick={() => toggle(3)}>Info</div>
      </div>
      <div className="tabs_content">
        <div className="tab_content">
          <div className={`jam_konten ${tabActive === 1 ? 'tab_konten_active' : "nonactive"}`}>
            {arrayCuaca === undefined ? "" : arrayCuaca.map(({ datetime, name }) => (
              <div className="jam_card" key={datetime}>
                <p style={{ marginBottom: "10px", fontSize: "12px" }}>{moment.unix(datetime).format('hh:mm A')}</p>
                <div className="logo_konten">
                {getIcon(name)}
                </div>
                <p style={{ fontSize: "14px", marginTop: "10px" }}>{name}</p>
              </div>
            ))}
          </div>
          <div className={`hari_konten ${tabActive === 2 ? 'tab_konten_active' : "nonactive"}`}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias possimus cumque optio maxime error veniam nihil quo provident excepturi mollitia?</p>
          </div>
          <div className={`info_konten ${tabActive === 3 ? 'tab_konten_active' : "nonactive"}`}>
            <p>info</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cuaca