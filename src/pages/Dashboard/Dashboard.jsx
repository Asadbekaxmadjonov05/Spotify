import React, { useContext, useEffect } from 'react'
import useAuth from '../../hook/useAuth'
import CustomRoutes from '../../routes/CustomRoutes'
import Navbar from '../../components/Navbar'
import Activity from '../../components/Activity'
import { Context } from '../../context/Context'
import SpotifyWebPlayer from 'react-spotify-web-playback'



function Dashboard({code}) {
  console.log(code);
  
  const accessToken = useAuth(code)
  const {token,setToken,play,setPlaying,playing} = useContext(Context)
  
useEffect(() =>{
  setToken(accessToken)
},[accessToken])
  return (
    <>
    <div className='flex relative justify-between'>
       <Navbar/>
       <div className='login-bg relative w-[60%] overflow-y-auto h-[100vh]'>
       <CustomRoutes/>
       </div>
       <Activity/>
    </div>
       <div className='absolute bottom-0 w-full '>
       <SpotifyWebPlayer
       token={token}
       uris={play ? [play] : []}
       play = {playing}
       callback={e =>{
         if(e.isPlaying) {
           setPlaying(false)
          }
        }}
        />
       </div>
        </>
  )
}

export default Dashboard