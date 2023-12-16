import { useState } from 'react';
import styles from './Task.module.css'
import {Circle, Trash, CheckCircle} from '@phosphor-icons/react'

export interface TaskProps{
    content: string;
    onDelete: (key:string) => void;
    onFinished: (arg:string) => void;
}



export function Task({content, onDelete, onFinished}:TaskProps){

    const [checked, setChecked] = useState(false)


    function handleDelete(){
        
        onDelete(content)
        onFinished(content)
    }

    function handleFinished(){
        
        setChecked(!checked)
        onFinished(content);
    }


    return (
        <div className={styles.task}>
            {
                
                !checked ? <Circle className={styles.circle} onClick={handleFinished} size={18}/> : <CheckCircle className={styles.circleChecked} onClick={handleFinished} size={18}/>
            }
            <p>{content}</p>
            <Trash onClick={handleDelete} size={17} className={styles.trash}/>
        </div>
    )
}