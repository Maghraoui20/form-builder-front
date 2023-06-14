import { Box, Button, Container, Paper } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Fields from "../pages/Page";
import { useState } from "react";
import Axios from "axios";
function FormBuilder() {
  
    const [Form, setForm] = useState({name:"",inputs:[{label:"",name:"", type:""}] })
   const handleChangeName =(e)=>{
    setForm({ ...Form, name: e.target.value  });

   }
   const handleChange =(name,key, e)=>{
    

  
        const inputs =[...Form.inputs]
        inputs[key] = {...Form.inputs[key] , [name]:e.target.value}
        setForm({...Form, inputs: [...inputs] }  )
      
        }

  
  const handleSubmit = async(e) => {
    console.log(Form,"fomr");
    e.preventDefault();
        try {
          
              const data = await Axios.post(
                "http://localhost:5000/form/createForm",
                Form
              );
              console.log(data,"data");
              return data;

          } catch (error) {
            console.log(error);
          }

  };

 

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          height: "maxWidth",
          m: 5,
          p: 10,
        }}
      >
        <form onSubmit={handleSubmit}>

          <div className="container">

            <div className="row">
              <div className="col-25">
                <label for="formName">Add Form Name</label>
              </div>
              <div className="col-75">
                <input type="text" placeholder="form name" name="formName" onChange={(e)=>{setForm({...Form, name:e.target.value})}} />
              </div>
            </div>
         {Form.inputs.map((e, key)=>(<div>

            <div>
              <div className="row">
                <div className="col-25">
                  <label for="labelForm">Label</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="label form name"
                    name="labelForm"
                    onChange={
                       (e)=>handleChange("label", key, e)
                      }                    />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label for="nameField"> Name</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    placeholder="Field name"
                    name="nameField"
                    onChange={
                        (e)=>handleChange("name", key, e)
                       }                   />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label for="typeField">Type</label>
                </div>
                <div className="col-75">
                  <select  onChange={
                       (e)=>handleChange("type", key, e)
                      } >
                    <option value="text">text</option>
                    <option value="date">date</option>
                    <option value="email">email</option>
                    <option value="tel">tel</option>
                    <option value="number ">number</option>
                  </select>
                </div>
              </div>
              </div>   
              </div>) )}

              <div className="row">
                        <Button onClick={()=>{ setForm({...Form , inputs:[...Form.inputs, {label:"",name:"", type:""} ]})}} > <LocalHospitalIcon/> </Button>
                    </div>
            <div className="row">
                        <button className="button">submit Field</button>
                    </div>

                   
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default FormBuilder;
