import React from 'react'
import axios from 'axios';
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Active() {

    const state = useSelector((state)=>{
        return state
      })
      console.log(state.Login.token);

    const activeAccount = (id)=>{

        await axios.put(
            `${BASE_URL}/task/${id}`,
            {
              desc: updateTask,
            },
            {
              headers: {
                Authorization: `Bearer ${state.Login.token}`,
              }
            }
          );
          getTask(local);
    }
    return (
        <div>
            <input placeholder="enter Your Code"/>
            <button onClick={activeAccount}>Active</button>
        </div>
    )
}
