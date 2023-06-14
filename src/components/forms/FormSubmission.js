import { Container, Paper } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PageFormSubmission() {
  const params = useParams();
  const [Form, setForm] = useState({});
  let auth = JSON.parse(localStorage.getItem("profile"));
const [Inputs,setInputs] = useState([]);
  const [submittedForm, setSubmittedForm] = useState({
    user: auth._id,
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
        setSubmittedForm({...submittedForm, form:result.data.formName._id})
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
    console.log(submittedForm,"sub");
         try {
          
              const data = await Axios.post(
                "http://localhost:5000/submissionform/createSubmitForm",
                submittedForm
              );
              console.log(data,"data");
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
          m: 5,
          p: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">{Form.name}</div>

            <div className="row" >
                
                {Inputs.map((input,key)=>(
    <div className="col-25">
    <label >{input.label}:</label>
    {input.type==="text" ||input.type==="tel" || input.type==="date" || input.type==="email"?  
      <input type={input.type}  name={input.name} onChange={(e)=>handlChange(input.name, e, key)}  ></input>
 :null }

</div>
               )


)}     

</div>

            <div className="row">
              <button className="button">submit Form</button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default PageFormSubmission;
