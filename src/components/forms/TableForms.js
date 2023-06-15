import { Button } from "@mui/material";
import  Axios  from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
function TableForms() {
  const Navigate = useNavigate();
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

      const handleDelete =async(id)=>{
      console.log(id);
      try {
         await Axios.delete("http://localhost:5000/form/"+id);
         window.location.reload();
      } catch (e) {
        console.log(e);
      }
      }
      const handleUpdate =(id)=>{
        Navigate(`/form/${id}`)
      }
    return (
       Forms.length > 0 ?
<div>
       <div  style={{
        margin:30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight:"bold"
        }}>List of Forms</div>
                <div style={{
    margin:50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

             
                <table
        style={{ border: "2px solid grey", width: "800px", height: "200px" }}
      >                    <thead>
                        <tr>
                            <th style={{ borderBottom: "1px solid black" }}>Form ID</th>
                            <th style={{ borderBottom: "1px solid black" }}>Form name</th>

                            <th style={{ borderBottom: "1px solid black" }}>Update</th>
                            <th style={{ borderBottom: "1px solid black" }}>Delete</th>


                        </tr>
                    </thead>
                    <tbody>

                         {Forms.map((form, index) =>
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>{form._id}</td>
                                <td style={{ textAlign: "center" }}>{form.name}</td>
                               
                                <td style={{ textAlign: "center" }}><Button onClick={()=>handleUpdate(form._id)} >Update</Button></td>

                                <td style={{ textAlign: "center" }}><Button onClick={()=>handleDelete(form._id)} >Delete</Button></td>

                               

                            </tr>)} 
                    </tbody>
                </table>
            </div> </div> : <div><h1>Loading...</h1></div>
            
    );
}

export default TableForms;