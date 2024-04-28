import {useRef, useState} from "react";

import FormComponent from "../../components/todo_form/Form";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Setting = () => {
    let [param] = useSearchParams()
    const todo_id = param.get("todo_id")
    let data_list = useSelector((state) => state.todo_slice.todo_list);
    let data = data_list.find((data)=>data.id === parseInt(todo_id))
    return (
        <>
            <div className="container py-5 w">
                <h3 className='my-3 text-center'>Add new Todo</h3>
                <FormComponent data={data} />
            </div>
        </>
    )
}
export default Setting