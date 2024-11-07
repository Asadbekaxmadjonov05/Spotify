import React, { lazy, Suspense, useContext, useEffect, useState} from 'react'
import { Context } from '../../context/Context'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hook/useEnv'


const MusicLists = lazy(() => new Promise(resolve =>{
  return setTimeout(()=> resolve(import('../../components/MusicLists')),800)
}))

function Home() {
const {token} = useContext(Context)
const spotifyApi = new SpotifyWebApi({
  clientId:CLIENT_ID
})

const [trendMusucList, setTrendMusuic] = useState([])

useEffect(() =>{
  if(!token) return;
  // qaren hozir man run qivoman single page yozilgan ln hatolari bor man topomayamande shun korib berin a
  spotifyApi.setAccessToken(token)
 },[token])

useEffect(() =>{
  if(token){
  spotifyApi.searchAlbums("Jony").then(res => {
    setTrendMusuic(res.body.albums.items.splice(0,6).map(item =>{
      const data = {
        id:item.id,
        img:item.images[0].url,
        trackName:item.name,
        artistName:item.artists[0].name,
        uri:item.uri
     }
     return data
    }))
  })
  }
},[token])

  return (
    <Suspense fallback={<img className='absolute inset-0 m-auto'/>}>
    <div className='p-5'>
      <h2 className='font-bold text-[39px] text-white mb-[29px]'>Good afternoon</h2>
      <ul className='flex flex-wrap gap-4 justify-between mb-[50px]'>
        {trendMusucList.map(item => (
          <li className='flex trends-item overflow-hidden rounded-[6px] w-[48%] items-center space-x-[21px]' key={item.id}>
            <img className='h-[82px] ' src={item.img} alt="Trend Img" width={82} height={82}/>
              <h2 className=' text-white font-bold text-[20px] '>{item.trackName}</h2>
          </li>
        ))}
      </ul>
    <div className='space-y-[50px]'>
    <MusicLists  artistName={"Botir Qodirov"}/>
    <MusicLists  artistName={"Shohjahon Jorayev"}/>
    <MusicLists  artistName={"Sherali Jo'rayev"}/>
    <MusicLists  artistName={"Zohishoh Jo'rayev"}/>
  
    </div>
    </div>
    </Suspense>

  )
}

export default Home













