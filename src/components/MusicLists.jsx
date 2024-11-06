import React, { useContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import { Context } from '../context/Context';
import  {CLIENT_ID} from '../hook/useEnv'
import { useNavigate } from 'react-router-dom';

function MusicLists({artistName}) {
const {token,setPlaying,setPlay} = useContext(Context)
const [tracksList, setTracksList] = useState([])
const navigate = useNavigate()


    const spotifyApi = new SpotifyWebApi({
        clientId:CLIENT_ID
      })

      useEffect(() =>{
        if(!token) return;
        spotifyApi.setAccessToken(token)
       },[token])



    useEffect(() => {
        if(token){
          spotifyApi.searchTracks(artistName).then(res => {
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


    function handlePLay(item) {
        setPlay(item.uri);
        setPlaying(true)
        navigate(`/music/${item.id}`)
      }


  return (
    <div>
        <h2 className='font-bold text-[28px] text-white'>{artistName}</h2>
    <div className='flex overflow-x-auto justify-between gap-5'>
    {tracksList?.map(item =>(
      <div onClick={() => handlePLay(item)} key={item.id} className='min-w-[225px] overflow-x-auto cursor-pointer p-[21px] rounded-[8px] bg-[#1c1c1c]'>
        <img className='h-[182px] mb-[25px] rounded-[8px]'src={item.img} alt="Track img" width={"100%"} />
        <h2 className='text-white mb-2 font-bold text-[20px]'>{item.trackName}</h2>
        <p className='font-medium text-[18px] text-white opacity-[60%]'>{item.artistName}</p>
      </div>
    ))}
  </div>
  </div>
  )
}

export default MusicLists