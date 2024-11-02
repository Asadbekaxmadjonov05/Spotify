import { useEffect, useState } from 'react'
import { useAxios } from './useAxios'



function useAuth(code) {
  const [accessToken, setAccessToken] = useState(null)
  useEffect(() => {
    useAxios().post("/login",{code}).then(res =>{
      setAccessToken(res.data.accessToken)
      window.history.pushState({},null,"/")
    }).catch(err =>window.location= "/")
  },[code])
  return accessToken 
}

export default useAuth