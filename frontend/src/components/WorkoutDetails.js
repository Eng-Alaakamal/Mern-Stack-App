import {useWorkoutsContext} from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({workout}) => {
  const {dispatch}=useWorkoutsContext()
  const {user} =useAuthContext()

  if(!user){
    return
  }

  const handleClick =async()=>{
   const response =await fetch('/api/'+workout._id,{
    method:'DELETE',
    headers:{'Authorization':`Bearer ${user.token}`}
   })

   const json =await response.json()
   if(response.ok){
    dispatch({type:'DELETE_WORKOUT', payload:json})
   }
  }
    return ( 
        <div className="workout-details">
          <h4>{workout.title}</h4>
          <p><strong>Load (kg):</strong>{workout.load}</p>
          <p><strong>Reps:</strong>{workout.reps}</p>
          <p>{workout.createdAt}</p>
          <span onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default WorkoutDetails;