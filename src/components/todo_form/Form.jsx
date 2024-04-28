import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {addGroup, editTodo} from "../../store/todoSlice";
import {useEffect} from "react";

const FormComponent = ({data}) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let initialValues = {
        id: Math.floor(Math.random() * 1000),
        title: "",
        text: "",
        isCompleted: true,
    }
    let todo_id = data?.id
    const {values, errors, handleChange, handleSubmit, setValues} = useFormik({
        initialValues,
        onSubmit: handleAddTodo,
        validate: (form) => {
            let error = {}
            if (!form?.title?.trim()) {
                error.title = "Required field title!"
            }
            if (!form?.text?.trim()) {
                error.text = "Required field description!"
            }
            return error;
        },
    })
    useEffect(() => {
        if (!todo_id) return;
        setValues({
            id: data?.id,
            title: data.title,
            text: data.text,
            isCompleted: false,
        });

    }, [data?.id]);

    function handleAddTodo(data, {resetForm}) {
        if (data) {
            if (todo_id) {
                dispatch(editTodo(data))
            } else {
                dispatch(addGroup(data))
            }
            Swal.fire({
                toast: true,
                position: "top-end",
                title: todo_id ? 'Data edited' : 'Data added',
                icon: 'success',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            })
            navigate('/')
        }

    }


    return (
        <>
            <form
                className='d-flex flex-column gap-2 align-items-center w-50 bg-light p-4 mx-auto my-auto rounded shadow-sm'>
                <div className="mb-3 w-100">
                    <label htmlFor="title" className="form-label">Todo title</label>
                    <input type="text" className={`form-control ${errors?.title && 'is-invalid'}`}
                           name="title" onChange={handleChange} id="title" value={values?.title}/>
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="text" className="form-label">Text</label>
                    <textarea name='text' className={`form-control  ${errors?.text && 'is-invalid'}`}
                              value={values?.text}
                              onChange={handleChange} id="text">
                    </textarea>
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default FormComponent