import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../hooks/useHttp';
import { fetchPlayers, playerDeleted, } from '../actions';
import Spinner from './Spinner';
import Empty from './Empty';
import PlayerListItem from './PlayerListItem';
import { createSelector } from '@reduxjs/toolkit'
const PlayersList = () => {

  const filteredPlayersSelector = createSelector(
    state => state.filters.activeFilter,
    state => state.players.players,
    (filter, players) => {
      if(filter === "All"){
        console.log("Render")
        return players
      }else{
        return players.filter((item) => item.continent === filter)
      }
    }
  )
  
  const filteredPlayers = useSelector(filteredPlayersSelector)
  const playersLoadingStatus = useSelector(state => state.players.playersLoadingStatus)
  const dispatch = useDispatch()
  const { request} = useHttp()
  useEffect(() => {
    dispatch(fetchPlayers(request))
  }, [])

  const onDelete = useCallback((id) => {
    request(`http://localhost:3000/players/${id}`, "DELETE")
    .then(res => console.log(res, "Succsesfully deleted"))
    .then(dispatch(playerDeleted(id)))
    .catch(err => console.log(err.message)
    )
  }, [request])

  if(playersLoadingStatus === "loading"){
    return <Spinner classNames={"h-8 w-8 mx-auto text-white"}/>
  }else if(playersLoadingStatus === "error"){
    return <Error/>
  }

  const renderPlayers = () => {
    if(!filteredPlayers.length){
      return <Empty/>
    }

    return filteredPlayers.map(({id, ...props}) => (
        <PlayerListItem key={id} id={id}  {...props}
        onDelete={() => onDelete(id)}/>
    ))
  }
  return (
    <div className='flex flex-col gap-4'>
       {renderPlayers()}
    </div>
  )
}

export default PlayersList