/* The code is importing the React library and the Bootstrap library, and also importing two images
from the '../img' directory. */
import React from 'react';


const img1=require('../img/jazz.jpeg');
const img2=require('../img/nube.jpeg');

/* The code is defining a functional component named `Formalumnos` using arrow function syntax. The
component uses React hooks to manage state, including `useState` to define and update variables for
`actualizar`, `id`, `nombre`, `carrera`, `imagen`, and `alumnos`. The `alumnos` state variable is
initialized with an array of two objects, each representing a student with properties for `id`,
`nombre`, `carrera`, and `foto`. The component also defines functions for adding, editing, and
deleting students, as well as a function for handling changes to the `imagen` state variable. The
component returns a form for adding or editing students, as well as a table displaying the list of
students with options to edit or delete each one. */

//estados para agregar un nuevo alunmno 
const Formalumnos = () => {
    const [actualizar, setActualizar] = React.useState(false);
    const [id, setId] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
    const [imagen,setImagen]=React.useState('');
    const [alumnos, setAlumnos] = React.useState([
        {
            'id': '201901',
            'nombre': 'Jazz Vega',
            'carrera': 'Sistemas',
            'foto':img1
        },
        {
            'id': '201902',
            'nombre': 'Nube Medina',
            'carrera': 'Administracion',
            'foto':img2
        }
    ]);
//funciones para actualizar al alumno 
    /**
     * This is a function that adds or updates a student's information in a list of students.
     */
    const onIdChange = (e) => {
        setId(e.target.value);
    }
    const onNombreChange = (e) => {
        setNombre(e.target.value);
    }
    const onCarreraChange = (e) => {
        setCarrera(e.target.value);
    }
    const addAlumno = (e) => {
        e.preventDefault();
        let nuevoAlumno = {
            'id': id,
            'nombre': nombre,
            'carrera': carrera,
            'foto':imagen,
        }
        let newList=alumnos;
        if (actualizar) {
            newList = alumnos.map((alumno =>
                alumno.id === nuevoAlumno.id ? {...alumno,...nuevoAlumno,foto: imagen || alumno.foto} : alumno
            ));
        } else {
            newList = [...alumnos, nuevoAlumno];
        }

        setAlumnos(
            newList
        );
        setActualizar(false)
        setId('');
        setNombre('');
        setCarrera('')
    }

   /**
    * The function removes a student from a list of students based on their ID.
    */
    const eliminarAlumno = (id) => {
        const newList = alumnos.filter(item => item.id !== id);
        console.log(newList);
        setAlumnos(newList)
    }

    /**
     * The function "editarAlumno" sets the state variables for a selected student's ID, name, major,
     * and photo to enable editing.
     */
    const editarAlumno = (id) => {
      let alumnoEditar=alumnos.filter(alumno=>alumno.id===id)
        alumnoEditar=alumnoEditar[0]
        setId(alumnoEditar.id)
        setNombre(alumnoEditar.nombre)
        setCarrera(alumnoEditar.carrera)
        setImagen(alumnoEditar.foto)
        setActualizar(true)
    }
    //funcion para agrgar imagen
    /**
     * The function handles the change of an image input and sets the image as a URL object.
     */
    const handleImagenChange=(e)=>{
        const archivo=e.target.files[0];
        const reader=URL.createObjectURL(archivo);
        setImagen(reader);
        console.log(imagen)

    }
    /* The `return` statement is rendering the JSX code for a form and a table. The form includes input
    fields for a student's ID, name, major, and photo, as well as a button to submit the form. The
    table displays a list of students with their ID, name, major, and photo, as well as options to
    edit or delete each student. The JSX code is using React state variables and functions to manage
    the data and behavior of the form and table. */
    return (
        <div style={{marginTop:50}}>
            <form style={{marginBottom: 50}} onSubmit={addAlumno}>
                <label style={{padding: 10}} htmlFor="id">Clave:</label>
                <input style={{padding: 5}} type="text" name="id" value={id} onChange={onIdChange}/>
                <label style={{padding: 10}} htmlFor="nombre">Nombre:</label>
                <input style={{padding: 5}} type="text" name="nombre" value={nombre} onChange={onNombreChange}/>
                <label style={{padding: 10}} htmlFor="carrera">Carrera:</label>
                <input style={{padding: 5}} type="text" name="carrera" value={carrera} onChange={onCarreraChange}/>
                <label style={{padding: 10}} htmlFor="foto">Foto:</label>
                <input style={{padding: 5}} type="file" name="foto"   onChange={handleImagenChange}/>

                <button style={{backgroundColor: 'blue',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer'}} type="submit">
                                    Guardar
                </button>
            </form>

            <table class='table table-primary' border={1}>
                <thead>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Carrera</th>
                </thead>
                <tbody>
                {
                    alumnos.map(alumno => (
                        <tr>
                            <td>{alumno.id}</td>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.carrera}</td>
                            <td><img src={alumno.foto}/></td>
                            <td style={{cursor: 'pointer'}} onClick={()=>{
                                editarAlumno(alumno.id)
                            }}>Editar</td>
                            <td style={{cursor: 'pointer'}} onClick={() => {
                                eliminarAlumno(alumno.id)
                            }}>Eliminar
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
};

export default Formalumnos;