import { useEffect, useState } from 'react';
import './App.css';
import localization from 'moment/locale/id';

import provinsi from './dataProvinsi.js'
import Magnitudo from './Magnitudo';
import Cuaca from './Cuaca';
import moment from 'moment';

moment.updateLocale('id', localization);


function App() {

  const [idProvinsi, setIdProvinsi] = useState(11)
  const [Arrkota, setArrKota] = useState([])
  const [dataCuaca, setDataCuaca] = useState([])
  const namaProvinsi = 'dki-jakarta'
  // const [namaProvinsi, setNamaProvinsi] = useState("dki-jakarta")
  const namaKota = "Jakarta-barat"
  // const [namaKota, setNamaKota] = useState("Jakarta-barat")
  // const [newProvinsi, setNewProvinsi] = useState("")

  const getArrKota = async (id) => {
    const resp = await fetch(`http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))

    setArrKota(resp.kota_kabupaten)
  }

  const getCuaca = async (provinsi, kota) => {
    const { data } = await fetch(`https://cuaca-gempa-rest-api.vercel.app/weather/${provinsi}/${kota}`).then(res => res.json()).catch(err => console.log(err));

    // ambil array params
    const params = data.params

    // ambil object weather
    const weather = params[6].times

    // ambil 5 array dari object weather
    const arrCuaca = weather.slice(0, 5)
    const arrayCuaca = []

    arrCuaca.forEach(e => {
      arrayCuaca.push({
        code: e.code,
        datetime: e.datetime,
        name: e.name,
      })
    });

    // judul 
    const CoreJudul = arrCuaca[0].name

    const [celcius] = data.params[5].times.slice(0, 1)
    const [tmax] = data.params[2].times.slice(0, 1)
    const [tmin] = data.params[4].times.slice(0, 1)
    setDataCuaca({
      namaDaerah: data.description,
      suhu: celcius.celcius,
      suhuMaksimal: tmax.celcius,
      suhuMinimum: tmin.celcius,
      judul: CoreJudul,
      arrayCuaca
    })
  }

  const getFullNewUrl = async (Idprovinsi, kota) => {

    const {kota_kabupaten} = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${Idprovinsi}`)
      .then(res => res.json())
      .catch(err => console.log(err))

      // cari nama kota yang sama dengan kota
      const newId = await kota_kabupaten[0].id_provinsi
      const {nama} = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${newId}`).then(res => res.json()).catch(err => console.log(err))

      const namaProvinsi = nama.split(' ').join("-");
      const namaKota = kota.split(' ').slice(1,3).join('-')

      getCuaca(namaProvinsi, namaKota)
  }
  

  useEffect(() => {
    getCuaca(namaProvinsi, namaKota)
    getArrKota(idProvinsi)
  }, [])

  useEffect(() => {
    getArrKota(idProvinsi)
  }, [idProvinsi])


  return (
    <div className="App">
      <div className="container_input">
        <div className="input_provinsi">
          <select onChange={(e) => {setIdProvinsi(e.target.value) }} id="provinsi" className='select_provinsi' >
            {provinsi.map((p) => (
              <option className='option_provinsi' key={p.id} value={p.id}>{p.nama}</option>
            ))}
          </select>
        </div>
        <div className="input_kota">
          <select id="kota" className='select_kota' onChange={(e) => getFullNewUrl(idProvinsi, e.target.value)}>
            {Arrkota.map((k) => (
              <option className='option_provinsi' key={k.id} value={k.nama}>{k.nama}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="main_content">
        <Magnitudo />
        <Cuaca dataCuaca={dataCuaca} />
      </div>
    </div>
  );
}

export default App;