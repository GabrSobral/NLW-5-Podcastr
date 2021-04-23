import { createContext, ReactNode, useContext, useState } from 'react'

interface Episode {
  id : string,
  title : string,
  thumbnail : string,
  members : string,
  url : string,
  duration : number
  durationAsString : string
  publishedAt : string,
}

interface PlayerContextData{
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean
  play: (episode : Episode) => void;
  tooglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state : boolean) => void;
  playList: (list: Episode[], index : number) => void,
  hasPrevious: boolean;
  hasNext: boolean;
  toogleLoop: () => void;
  isLooping: boolean;
  toogleShuffle:() => void;
  isShuffling: boolean;
  clearPlayerState : ()=> void
}
interface PlayerContextProviderProps {
  children : ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerProvider({children} : PlayerContextProviderProps) {
  const [ episodeList, setEpisodeList ] = useState([])
  const [ currentEpisodeIndex, SetCurrentEpisodeIndex ] = useState(0)
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ isLooping, setIsLooping ] = useState(false)
  const [ isShuffling, setIsShuffling ] = useState(false)

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function play(episode : Episode) {
    setEpisodeList([episode])
    SetCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }
  function playList(list : Episode[], index : number){
    setEpisodeList(list)
    SetCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }
  function tooglePlay(){
    setIsPlaying(!isPlaying)
  }
  function toogleLoop(){
    setIsLooping(!isLooping)
  }
  function setPlayingState(state : boolean){
    setIsPlaying(state)
  }
  function toogleShuffle(){
    setIsShuffling(!isShuffling)
  }
  function clearPlayerState(){
    setEpisodeList([])
    SetCurrentEpisodeIndex(0)
  }

  function playNext(){
    if(isShuffling) {
      const nextRandowmEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      SetCurrentEpisodeIndex(nextRandowmEpisodeIndex)
    } else if(hasNext) {
      SetCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }
  function playPrevious(){
    const previousEpisodeIndex = currentEpisodeIndex - 1
    if(hasPrevious){
      SetCurrentEpisodeIndex(previousEpisodeIndex)
    }
  }

  return(
    <PlayerContext.Provider
      value={{ 
        episodeList, 
        currentEpisodeIndex,
        isPlaying,
        play,
        tooglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
        toogleLoop,
        isLooping,
        toogleShuffle,
        isShuffling,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePLayer = () => {
  return useContext(PlayerContext)
}