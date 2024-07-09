import { useContext, useEffect, useState } from 'react'
import './BigGraph.css'
import { selectedProperty } from '../../RoutesManeg'
import axios from 'axios'
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis } from 'recharts'
import { Tooltip } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router-dom'

const mess = [
    {'week_day':'sat' , 'day_log' : 4},
    {'week_day':'sun' , 'day_log' : 5},
    {'week_day':'mon' , 'day_log' : 2},
    {'week_day':'teu' , 'day_log' : 1},
    {'week_day':'wed' , 'day_log' : 8},
    {'week_day':'thu' , 'day_log' : 9},
    {'week_day':'fri' , 'day_log' : 7},
]

function BigGraphBot(){
    const manage = useNavigate()
    
    const {selected} = useContext(selectedProperty)
    const [startDate, setStartDate] = useState(selected.create_date);
    const [endDate , setEndDate]= useState(new Date().toJSON().slice(0, 10))
    const [graph , setGraph] = useState({})
    const [show , setShow] = useState({})
    const [counts , setCounts] = useState([])
    useEffect(()=>{
        
        axios.get(`http://127.0.0.1:8000/bot-log/${selected.bot_id}&${startDate}&${endDate}` ,{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
            setGraph(response.data.graph)
            setCounts(response.data)
            console.log(response.data.graph)
        })
    },[startDate , endDate])

    function OpenMessages(get){
        axios.get(`http://127.0.0.1:8000/bot-log/${selected.bot_id}&${startDate}&${endDate}/sent-messages` ,{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
            setShow(response.data)
            manage('/managementPanel/view-filtered' , { state: response.data })
        })
    }
    return <div className='d-flex flex-column align-items-center justify-content-center' >
        <div style={{backgroundColor:'#030619', width:'85%'}} className='mt-5 d-flex flex-column align-items-center pb-5'>
        <div  style={{height:'300px' , width:'80%'}} className='m-5 d-flex d-column justify-content-center align-items-center'>
          
          <ResponsiveContainer width='100%' height='100%'>
              <BarChart width={500} height={400} data={graph} margin={{right:40 , left:40, }} >
              <XAxis dataKey='date' />
              <Tooltip />
              <Legend/>
                  <Bar  dataKey='count' stroke='#053f96' fill='#053f96' />
                  
              </BarChart>
          </ResponsiveContainer>
           
              
          </div>
  
  
          <div className='w-50 p-4 rounded-3' style={{backgroundColor:'#081D3C'}}>
              <div className='w-100 d-flex justify-content-between mb-5 '>
                  <DatePicker className='w-100 rounded-4 mx-2' selected={startDate} onChange={(date) => setStartDate(date.toJSON().slice(0, 10))} />
                  <DatePicker className=' w-100 rounded-4 mx-2' selected={endDate} onChange={(date) => setEndDate(date.toJSON().slice(0, 10))} />
              </div>
              <div className='d-flex text-center btnBluee justify-content-between mb-4 row'>
                  <div  className=' col-12 col-md m-2'>
                    <h2>{counts['messages_in_period']}</h2>
                    <button onClick={OpenMessages} className=' btnBluee'>See Sent</button>
                  </div>
              </div>
          </div> 
        </div>
       
        
       
    </div>
                 
       
    
}

export default BigGraphBot;