import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import SpotifyWebApi from 'spotify-web-api-node'
import {CLIENT_ID} from '../../hook/useEnv'
import SpotifyWebPlayer from 'react-spotify-web-playback'

function Home() {
const {token} = useContext(Context)
const [tracksList, setTracksList] = useState([])

const [play,setPlay] = useState([])
const [playing,setPlaying] = useState(false)

const spotifyApi = new SpotifyWebApi({
  clientId:CLIENT_ID
})

 useEffect(() =>{
  if(!token) return;
  spotifyApi.setAccessToken(token)
 },[token])

useEffect(() => {
if(token){
  spotifyApi.searchTracks("Xcho").then(res => {
     setTracksList(res.body.tracks.items.map(item =>{
      const data = {
         id:item.id,
         img:item.album.images[0].url,
         trackName:item.name,
         artistName:item.album.artists[0].name,
         uri:item.uri
      }
      return data
     }))
  })
}
},[token])

function handlePLay(uri) {
  setPlay(uri);
  setPlaying(true);
}

  return (
    <>
    <div className='flex overflow-x-auto justify-between p-5 gap-5'>
      {tracksList?.map(item =>(
        <div onClick={() => handlePLay(item.uri)} key={item.id} className='min-w-[225px] overflow-x-auto cursor-pointer p-[21px] rounded-[8px] bg-[#1c1c1c]'>
          <img className='h-[182px] mb-[25px] rounded-[8px]'src={item.img} alt="Track img" width={"100%"} />
          <h2 className='text-white mb-2 font-bold text-[20px]'>{item.trackName}</h2>
          <p className='font-medium text-[18px] text-white opacity-[60%]'>{item.artistName}</p>
        </div>
      ))}
    </div>
    <div className='absolute bottom-0 w-full'>
    <SpotifyWebPlayer
      token={token}
      uris={play ?[play] : []}
      play={playing}
      callback={(e) =>{
          if(e.isPlaying){
            setPlaying(false)
          }
      }}
    />
  </div>
    </>
  )
}

export default Home













