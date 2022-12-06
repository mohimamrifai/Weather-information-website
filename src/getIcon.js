import {BsBrightnessHighFill, BsFillCloudyFill, BsFillCloudHazeFill, BsCloudFog2Fill} from 'react-icons/bs'
import {BiCloudLightRain} from 'react-icons/bi'
import { GiSmokeBomb, GiHeavyRain} from 'react-icons/gi'
import { ImNotification} from 'react-icons/im'


function getIcon (namacuaca) {
    switch (namacuaca) {
      case "Cerah":
        return <BsBrightnessHighFill />
      case "Cerah Berawan":
        return <BsFillCloudyFill/>
      case "Berawan":
        return <BsFillCloudyFill/>
      case "Berawan Tebal":
        return <BsFillCloudyFill/>
      case "Asap":
        return <GiSmokeBomb />
      case "Udara Kabur":
        return <BsFillCloudHazeFill/>
      case "Kabut":
        return <BsCloudFog2Fill/>
      case "Hujan Ringan":
        return <BiCloudLightRain/>
      case "Hujan Sedang":
        return <GiHeavyRain/>
      case "Hujan Lebat":
        return <BiCloudLightRain/>
      default:
        return <ImNotification/>
    }
  }

export default getIcon;