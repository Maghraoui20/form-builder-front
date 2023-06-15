import Axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateRange } from "@mui/icons-material";
function TableUserSubmission() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [forms, setForms] = useState([]);


  const handleChange = async(e)=>{

    try {
        if(e.target.value==="all") {
            const result = await Axios.get(
                "http://localhost:5000/submissionform/getusersSubmission"
              );
              setData(result.data);

        }else{

            const resultPage = await Axios.get(
                "http://localhost:5000/page/getFiltredPages/"+e.target.value
              );
              setData(resultPage.data)
        }
  } catch (e) {
        console.log(e);
      }
}


const handleChangeForms = async(e)=>{

    try {
        if(e.target.value==="all") {
            const result = await Axios.get(
                "http://localhost:5000/submissionform/getusersSubmission"
              );
              setData(result.data);

        }else{

            const resultForm = await Axios.get(
                "http://localhost:5000/form/getFilterForms/"+e.target.value
              );
              setData(resultForm.data)
        }
  } catch (e) {
        console.log(e);
      }
}
const handleChangeDate =async(e)=>{
    try {
       
console.log(e.target.value);
const date = e.target.value;
            const resultDate = await Axios.get(
                `http://localhost:5000/submissionform/getFilterDate?date=${date}`
              );
              setData(resultDate.data)
        
  } catch (e) {
        console.log(e);
      }
}

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get(
          "http://localhost:5000/submissionform/getusersSubmission"
        );
        const resultPage = await Axios.get(
            "http://localhost:5000/page/getPages"
          );
          const resultForms = await Axios.get("http://localhost:5000/form/getForms");
          setForms(resultForms.data);
          setPages(resultPage.data)
        setData(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div    
    >
    
   


      <div  style={{
      margin:30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight:"bold"
      }}>List of User's Submission</div>



<Box sx={{ minWidth: 120 , display:"flex", justifyContent:"center" , margin:"10px 350px 10px 350px"}}>
      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Filter Page</InputLabel>
        <Select

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >

            <MenuItem value="all">All</MenuItem>
              {pages.map((e) => (

          <MenuItem value={e._id}>{e.title}</MenuItem>
                      ))} 
         
        </Select>
      </FormControl>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Filter Form</InputLabel>
        <Select

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChangeForms}
        >
           <MenuItem value="all">All</MenuItem>
              {forms.map((e) => (

          <MenuItem value={e._id}>{e.name}</MenuItem>
                      ))} 
        </Select>
      </FormControl>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Creation Date</InputLabel>
        <TextField
type="date"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        onChange={handleChangeDate}
        >
        
        </TextField>
      </FormControl>
    </Box>
    
      <div  style={{
    margin:50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

     
      <table
        style={{ border: "2px solid grey", width: "800px", height: "200px" }}
      >
        <tr>
          <th style={{ borderBottom: "1px solid black" }}>User Name</th>
          <th style={{ borderBottom: "1px solid black" }}>User Email</th>
          <th style={{ borderBottom: "1px solid black" }}>
            user’s submissions
          </th>
          <th style={{ borderBottom: "1px solid black" }}>
            user’s submissions création date 
          </th>
        </tr>

        {data.length > 0 ? data.map((val, key) => {
          return (
            <tr key={key}>
              <td style={{ textAlign: "center" }}>{val.user.name}</td>
              <td style={{ textAlign: "center" }}>{val.user.email}</td>
              <td style={{ textAlign: "center" , display:"flex", justifyContent:"center"}}>
               
                <table
                style={{ border: "1px solid grey", width: "200px", height: "100px" , margin:20}}
              >
                <tr>
                  <th style={{ borderBottom: "1px solid black" }}>
                   Input Name
                  </th>
                  <th style={{ borderBottom: "1px solid black" }}>
                    Input Value 
                  </th>
                </tr>
                 


                {val.formSubmissions.map((input, key) => {
                      return (
                    <tr key={key}>
                      <td style={{ textAlign: "center" }}>{input.nameInput}
                      </td>
                      <td style={{ textAlign: "center" }}>{input.valueInput}
                      </td>
                      </tr>
                      
                    )
                    }
                
                )}
                  </table> 

               
              </td>
              <td style={{ textAlign: "center" }}>{moment(val.created).format("YYYY-MM-DD")}</td>


            </tr>
          );
        }) : <div> No data found </div>}
      </table>
      </div> 
    </div>
  );
}

export default TableUserSubmission;
