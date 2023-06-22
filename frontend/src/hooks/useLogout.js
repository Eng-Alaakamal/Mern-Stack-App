import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch :WorkoutsDispatch} = useWorkoutsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    //remove workouts
    WorkoutsDispatch({type:'SET_WORKOUTS',payload:null})

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}