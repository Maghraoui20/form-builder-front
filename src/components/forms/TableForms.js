import  Axios  from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function TableForms() {
  
    const [Forms, setForms] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await Axios.get("http://localhost:5000/form/getForms");
            setForms(result.data);
            console.log(result.data);
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      }, []);
    return (

       Forms.length > 0 ?
            <div className="container">
                <h2 className="">Page List </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Form ID</th>
                            <th>Form name</th>
                            <th>Form Link</th>

                           

                        </tr>
                    </thead>
                    <tbody>

                         {Forms.map((form, index) =>
                            <tr align="center" key={index}>
                                <td align="center">{form._id}</td>
                                <td align="center">{form.name}</td>
                               
                                <td align="center"> <Link to={`localhost:3000/form/${form._id}`}> Go to Form</Link></td>
                               

                               

                            </tr>)} 
                    </tbody>
                </table>
            </div> : <div><h1>Loading...</h1></div>
    );
}

export default TableForms;