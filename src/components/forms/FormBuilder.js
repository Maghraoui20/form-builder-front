import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Fields from "../pages/Page";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function FormBuilder() {
  const params = useParams();
  const [Form, setForm] = useState({
    name: "",
    inputs: [{ label: "", name: "", type: "" }],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(params.id, "para");
        if (params.id) {
          const result = await Axios.get(
            "http://localhost:5000/form/getoneform/" + params.id
          );
          setForm(result.data);
          console.log(result.data);
          }
          else{
            setForm({name: "",
            inputs: [{ label: "", name: "", type: "" }],})
          }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [params.id]);
 
  const handleChange = (name, key, e) => {
    const inputs = [...Form.inputs];
    inputs[key] = { ...Form.inputs[key], [name]: e.target.value };
    setForm({ ...Form, inputs: [...inputs] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(params.id ) {
        const data = await Axios.put(
          "http://localhost:5000/form/updateForm/"+params.id,
          Form
        );
        console.log(data, "data");
        return data;
      }
      else{
        const data = await Axios.post(
          "http://localhost:5000/form/createForm",
          Form
        );
        console.log(data, "data");
        return data;
      }
     
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <div style={{ margin: 20, fontSize: 20 }}>
                
                  <label for="formName">  {params.id ? "Update Form Name" : "Add Form Name"} </label>
                
              </div>
              <div style={{ margin: 10, width: 300 }}>
                  <TextField
                    type="text"
                    placeholder="form name"
                    name="formName"
                    value={Form.name}
                    onChange={(e) => {
                      setForm({ ...Form, name: e.target.value });
                    }}
                  />
                
              </div>
            </div>
            {Form.inputs.map((e, key) => (
              <div>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}
                    >
                      <label for="labelForm">Label</label>
                    </div>
                    <div style={{ margin: 10, width: 200 }}>
                       <TextField
                        type="text"
                        placeholder="label form name"
                        value={e.label}
                        name="labelForm"
                        onChange={(e) => handleChange("label", key, e)}
                      /> 
                     
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}
                    >
                      <label for="nameField"> Name</label>
                    </div>
                    <div style={{ margin: 10, width: 200 }}>
                       <TextField
                        type="text"
                        placeholder="Field name"
                        name="nameField"
                        value={e.name}
                        onChange={(e) => handleChange("name", key, e)}
                      /> 
                    
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ margin: 20, fontSize: 20 }}>
                      <label for="typeField">Type</label>
                    </div>
                    <div>
                      <FormControl style={{ margin: 10, width: 200 }}>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={e.type}
                          onChange={(e) => handleChange("type", key, e)}
                        >
                          <MenuItem value="text">text</MenuItem>
                          <MenuItem value="date">date</MenuItem>
                          <MenuItem value="email">email</MenuItem>
                          <MenuItem value="tel">tel</MenuItem>
                          <MenuItem value="number ">number</MenuItem>
                        </Select> 
                      
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <Button
                onClick={() => {
                  setForm({
                    ...Form,
                    inputs: [...Form.inputs, { label: "", name: "", type: "" }],
                  });
                }}
              >
                {" "}
                <LocalHospitalIcon />{" "}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
               
                <Button className="button" type="submit"> {params.id ?" Update Form" :"Add Form "}</Button>
             
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default FormBuilder;
