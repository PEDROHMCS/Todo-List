import styles from './App.module.css'
import './global.css'
import { Header } from './components/Header'
import {Task} from './components/Task'
import plus from './components/assets/plus.svg'
import { ChangeEvent, FormEvent, useState } from 'react'

interface TaskModel{
  content: string;
  finished: boolean;
}


export function App() {

  const [taskValue, setTaskValue] = useState('');

  const [finishedTasks, setFinishedTasks] = useState(0);

  const [Tasks, setTasks] = useState<TaskModel[]>([
    
  ])



  function handleInputChange(event : ChangeEvent<HTMLInputElement>){
    setTaskValue(event.target.value)
  }

  function handleClickCreate(event : FormEvent){
    event.preventDefault();
    setTasks([...Tasks, {content: taskValue, finished: false}])
    setTaskValue('')
  }

  function deleteTask(contentFilter:string){
    const tasksWithoutDeleted = Tasks.filter(({content}) => {
      return contentFilter !== content
    })

    setTasks(tasksWithoutDeleted)
    
  }

  function handleFinishedTask(contentFinished:string){
      Tasks.forEach(taskActual => {
        if(taskActual.content === contentFinished && !taskActual.finished){
          taskActual.finished = true
        }else if(taskActual.content === contentFinished && taskActual.finished){
          taskActual.finished = false
        }
      })

     countFinishedTasks();
  }

  function countFinishedTasks(){
    const val = Tasks.reduce((acc, current) => {
      return acc + Number(current.finished)
    }, 0)

    setFinishedTasks(val)
  }


  return (
    <div className={styles.main}>
      <Header />

      <div className={styles.inputsHandler}>
        <form onSubmit={handleClickCreate}>
          <input className={styles.inputTask} onChange={handleInputChange} value={taskValue} placeholder='Adicione uma nova tarefa'></input>
          <button type='submit'>Criar <img src={plus} alt="Adicionar" /></button>
        </form>
      </div>

      <div className={styles.tasksArea}>
        <div className={styles.tasksHeader}>
           <div className={styles.createdTasks}>
              <p className={styles.createdText}>Tarefas criadas</p>
              <p className={styles.createdAmount}>{Tasks.length}</p>
           </div>
           <div className={styles.doneTasks}>
              <p className={styles.doneText}>Concluídas</p>
              <p className={styles.doneAmount}>{finishedTasks}</p>
           </div>
        </div>
        <main>
          {
            Tasks.map(({content}) => {
              return <Task key = {content} content={content} onDelete={deleteTask} onFinished={handleFinishedTask}/>
            })
          }
          
        </main>
      </div>
    </div>
  )
}


