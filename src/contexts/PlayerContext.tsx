import { createContext, ReactNode, useState } from 'react'

interface Episode {
  title : string;
  members : string;
  thumbnail : string;
  duration : number;
  isPlaying : boolean
  url : string;
}

interface PlayerContextData{
  episodeList : Episode[];
  currentEpisodeIndex : number;
  isPlaying : boolean
  play : (episode : Episode) => void;
  tooglePlay : () => void;
  setPlayingState : (state : boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerProvider({children}) {
  const [ episodeList, setEpisodeList ] = useState([])
  const [ currentEpisodeIndex, SetCurrentEpisodeIndex ] = useState(0)
  const [ isPlaying, setIsPlaying ] = useState(false)

  function play(episode) {
    setEpisodeList([episode])
    SetCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }
  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state : boolean){
    setIsPlaying(state)
  }

  return(
    <PlayerContext.Provider
      value={{ 
        episodeList, 
        currentEpisodeIndex,
        isPlaying,
        play,
        tooglePlay,
        setPlayingState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}