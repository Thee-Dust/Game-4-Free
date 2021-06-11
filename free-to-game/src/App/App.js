import React, { useState, useEffect }from 'react'
import fetchGameData from '../ApiData/ApiCall'
import cleanGameData from '../ApiData/CleanApicall'
import './App.css'

export default function App() {
  const [ freeGames, setFreeGames] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const callGames = async () => {
      setError('')
      try{
        const gameData = fetchGameData()
        setFreeGames(gameData)
        console.log(gameData)
      }catch{
        setError('Failed to recieve games')
      }
    }
    callGames()
  },[])
    

  return (
    <div>
      hello
    </div>
  )
}