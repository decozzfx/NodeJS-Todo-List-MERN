import React,{ useEffect, useState} from 'react'
import { Checkbox, Button } from "@material-ui/core"
import { Paper } from "@material-ui/core";
import {useParams}  from 'react-router-dom'
import axios from 'axios'
import './TaskList.css'

const TasksList = () => {
    
    const [tasks, setTasks] = useState([])
    const [task , setTask] = useState('')
    const { id } = useParams()

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const response = await axios.get('http://localhost:5000/task')
        setTasks(response.data)
        console.info(response)
    }

    const updateTask = async (id) => {
        try {
            const oriTasks = [...tasks]
            const index = oriTasks.findIndex((task) => task._id === id)
            oriTasks[index] = {...oriTasks[index]}
            oriTasks[index].completed = !oriTasks[index].completed
            setTasks(oriTasks)
            await axios.put(`http://localhost:5000/task/${id}`, {
            completed : oriTasks[index].completed            
            })
        } catch (error) {
            console.info(error)
        }
    }
    
    const addTask = async (e) => {
        try {
            e.preventDefault()
            await axios.post('http://localhost:5000/task',{
            task : task
            })            
            setTask('')
            getTasks()
        } catch (error) {
            console.info(error)
        }
    }
    
    const deleteTask = async (id) => {
        const oritasks = tasks
        try {
            const tasks = oritasks.filter((task) => task._id !== id)
            setTask(tasks)
            await axios.delete(`http://localhost:5000/task/${id}`)
            getTasks()
            setTask('')
        } catch (error) {
            console.info(error)
        }
    }

    return (
        <div className='container'>
            <form onSubmit={addTask} >
                <div className="field">
                    <input type="text" className='input' placeholder='add new todo' value={task} onChange={((e) => setTask(e.target.value))} />
                    <button type='submit' >Add</button>
                </div>
            </form>
                <div>
            
                {tasks.map((task) => (
                    <Paper key={task._id} >                        
                    
                        <Checkbox checked={task.completed} onClick={() => updateTask(task._id)} />                                                
                    
                        <div className={task.completed?'task line_through' : 'task'}>{task.task}</div>
                    
                        <Button onClick={() => deleteTask(task._id)} >delete</Button>
                    
                    </Paper>
                    ))}                    
                
                </div>
            
        </div>
    )
}

export default TasksList
