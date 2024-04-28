import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toggleTodo, deleteTodo} from "../../store/todoSlice/index";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";

const Home = () => {
    const todo_list = useSelector((state) => state.todo_slice.todo_list);
    const [todoList, setTodoList] = useState(todo_list)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    function changeStatus(item) {
        dispatch(toggleTodo(item.id));
    }

    // function showStatus(e) {
    //     let val = e.currentTarget.value;
    //     if (val === '0') {
    //         setTodoList(todo_list)
    //         return
    //     }
    //     let list = todo_list.filter((item) => {
    //         return item.isCompleted.toString() === val;
    //     })
    //     setTodoList(list)
    // }


    function handleDelete(data) {
        dispatch(deleteTodo(data))
        Swal.fire({
            toast: true,
            position: "top-end",
            title: 'Data deleted successfully',
            icon: 'success',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        })
    }

    return (
        <>
            <div className="container">
                <h4 className='text-success text-center my-2 display-6'>Todo list</h4>

                <ul className="list-group my-5 w-75 p-4 mx-auto bg-light shadow-sm rounded">
                    {/*<div className="d-flex justify-content-end align-items-center my-3">*/}
                    {/*    <select className="form-select" aria-label="Default select example" onChange={showStatus}*/}
                    {/*            style={{width: '300px'}}>*/}
                    {/*        <option selected value='0'>Hamısı</option>*/}
                    {/*        <option value="true">Tamamlanmış</option>*/}
                    {/*        <option value="false">Tamamlanmamış</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <>
                        {todo_list?.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-sm-between" key={item.id + index}>
                                <div>
                                    <label htmlFor={item.id}
                                           className={item.isCompleted && 'text-decoration-line-through'}
                                    >{item.title}</label>
                                </div>
                                <div className="btn-group">
                                    <button className="btn btn-sm  btn-primary" disabled={item.isCompleted && 'disabled'} type='button'
                                            onClick={()=>changeStatus(item)}>Complete
                                    </button>
                                    <button className="btn btn-sm  btn-success" type='button'
                                            onClick={() => navigate('/setting' + `?todo_id=${item?.id}`)}
                                            disabled={item.isCompleted && 'disabled'}
                                    >Edit
                                    </button>
                                    <button className="btn btn-sm  btn-danger" type='button'
                                            onClick={() => handleDelete(item)}>Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </>

                </ul>
            </div>

        </>
    )
}
export default Home