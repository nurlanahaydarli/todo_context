import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {completedTodo, deleteTodo} from "../../store/todoSlice/index";
import Swal from "sweetalert2";

const Home = () => {
    const todo_list = useSelector((state) => state.todo_slice.todo_list);
    let navigate = useNavigate()
    let dispatch = useDispatch()

    function changeStatus(data) {
        // data.isCompleted = !data.isCompleted;
        // if (data.isCompleted) {
        //     // data['isCompleted'] = false
        //
        //     console.log('true')
        // } else {
        //     // data['isCompleted'] = true
        //     console.log('false')
        //
        //
        // }
        console.log(data, 'data')
        // dispatch(completedTodo(data))
    }

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
                    <div className="d-flex justify-content-end align-items-center my-3">
                        <select className="form-select" aria-label="Default select example " style={{width:'300px'}}>
                            <option selected>Hamısı</option>
                            <option value="1">Tamamlanmış</option>
                            <option value="2">Tamamlanmamış</option>
                        </select>
                    </div>
                    {todo_list ?
                        <>
                            {todo_list?.map((item,index) => (
                                <li className="list-group-item d-flex justify-content-sm-between" key={item.id+index}>
                                    <div>
                                        <input className="form-check-input me-1" id={item.id}
                                               onChange={() => changeStatus(item)} name='isCompleted'   type="checkbox" />
                                        <label htmlFor={item.id}>{item.title}</label>
                                    </div>
                                    <div className="btn-group">
                                        <button className="btn btn-sm  btn-success" type='button'
                                                onClick={() => navigate('/setting'+`?todo_id=${item?.id}`)}>Edit
                                        </button>
                                        <button className="btn btn-sm  btn-danger" type='button'
                                                onClick={() => handleDelete(item)}>Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </>
                        :
                        <></>
                    }
                </ul>
            </div>

        </>
    )
}
export default Home