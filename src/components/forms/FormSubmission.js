import { Button, Container, Paper, TextField } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function PageFormSubmission() {
  const params = useParams();
  const [Form, setForm] = useState({});
  let auth = JSON.parse(localStorage.getItem("profile"));
const [Inputs,setInputs] = useState([]);
const [submittedForm, setSubmittedForm] = useState({
  user: auth._id,
  page: "",
  form: "",
  formSubmissions: [
    {
      nameInput: "",
      valueInput: "",
    },
  ],
});
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get(
          "http://localhost:5000/page/getFormPages/" + params.id
        );
        console.log(result.data.formName);
        setForm(result.data.formName);
        setInputs(result.data.formName.inputs)
        setSubmittedForm({...submittedForm, page:params.id, form:result.data.formName._id})

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
 
  const handlChange = (name, e, key) => {

    const inputs =[...submittedForm.formSubmissions]
    inputs[key] = {nameInput:name , valueInput:e.target.value}
    console.log(('inputs',inputs))
    setSubmittedForm({...submittedForm, formSubmissions: [...inputs] }  )

  };
  const handleSubmit =async (e) => {
    e.preventDefault();
         try {
          
              const data = await Axios.post(
                "http://localhost:5000/submissionform/createSubmitForm",
                submittedForm
              );
toast("Your form is submitted successfully ! Thank you !")
return data;

          } catch (error) {
            console.log(error); }
  };
  return Form ? (
    <Container>
      <Paper
        elevation={3}
        sx={{
          height: "maxWidth",
          m: 15,
          p: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <div style={{ display: "flex", justifyContent:"center", fontSize:20, fontWeight:"bold", margin:40 }}>{Form.name}</div>
            <div style={{ display: "flex" }}>

          

            <div style={{ display: "flex" }}>
                
                {Inputs.map((input,key)=>(
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}>

    <label >{input.label}:</label>
      </div>
    {input.type==="text" ||input.type==="tel" || input.type==="date" || input.type==="email"?  
    <div style={{ margin: 10, }}>

      <TextField type={input.type}  name={input.name} onChange={(e)=>handlChange(input.name, e, key)}  ></TextField>
    </div>

 :null }

</div>
               )


)}     

</div>

            </div>
            <div   style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}>
              <Button className="button" type="submit">submit Form</Button>
            </div>
          </div>
        </form> 
      </Paper>
    </Container>
  ) : (
    <div>
      <h1>No Data Found </h1>
    </div>
  );
}

export default PageFormSubmission;
