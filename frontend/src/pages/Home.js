import { useEffect } from "react";
import {useWorkoutsContext} from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext"

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {
    
   const {workouts,dispatch} = useWorkoutsContext()//context--------------
   const {user} =useAuthContext()

    useEffect(()=>{
           const fetchWorkouts =async()=>{
                const response=await fetch('/api',
                {headers:{'Authorization':`Bearer ${user.token}`}}
                )
                const json =await response.json()

                if(response.ok){
                dispatch({type:'SET_WORKOUTS' , payload:json})//context----------------
                }
 
           }
          if (user){ 
           fetchWorkouts()
          }
    },[dispatch,user])
    return ( 
        <div className='home'>
          <div className="workouts"> 
          { workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
          </div>
          <WorkoutForm />
        </div>
     );
}
 
export default Home;