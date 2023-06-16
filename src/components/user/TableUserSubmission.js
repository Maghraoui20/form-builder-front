import Axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateRange } from "@mui/icons-material";
function TableUserSubmission() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [forms, setForms] = useState([]);

  const [date, setDate] = useState("");
  const [formId, setFormId] = useState("");
  const [pageId, setPageId] = useState("");

  const handleChangeDate = async (name,e) => {
    try {
      let uri = `http://localhost:5000/submissionform/getFilterDate?date=${date}&formId=${formId}&pageId=${pageId}`
      if(name==="Page")      {        setPageId(e.target.value === "all" ? "" : e.target.value)
      uri = `http://localhost:5000/submissionform/getFilterDate?date=${date}&formId=${formId}&pageId=${e.target.value === "all" ? "" : e.target.value}`
    }

      if(name==="Form")   {             setFormId(e.target.value === "all" ? "" : e.target.value);
      uri = `http://localhost:5000/submissionform/getFilterDate?date=${date}&formId=${e.target.value === "all" ? "" : e.target.value}&pageId=${pageId}`
    }
      if(name==="Date")    {            setDate(e.target.value);
        uri = `http://localhost:5000/submissionform/getFilterDate?date=${e.target.value}&formId=${formId}&pageId=${pageId}`
      }

      // localhost:5000/submissionform/getFilterDate?date=2023-06-10&formId=648b90a28b220d05c86e09e4&pageId=648af450230f7735acd649a4
      const resultDate = await Axios.get(
        uri
      );
      setData(resultDate.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get(
          "http://localhost:5000/submissionform/getusersSubmission"
        );
        const resultPage = await Axios.get(
          "http://localhost:5000/page/getPages"
        );
        const resultForms = await Axios.get(
          "http://localhost:5000/form/getForms"
        );
        setForms(resultForms.data);
        setPages(resultPage.data);
        setData(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          margin: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        List of User's Submission
      </div>

      <Box
        sx={{
          minWidth: 120,
          display: "flex",
          justifyContent: "center",
          margin: "10px 350px 10px 350px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setPageId(e.target.value === "all" ? "" : e.target.value)
              handleChangeDate('Page',e);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {pages.map((e) => (
              <MenuItem value={e._id}>{e.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter Form</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setFormId(e.target.value === "all" ? "" : e.target.value);
              handleChangeDate('Form',e);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {forms.map((e) => (
              <MenuItem value={e._id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Creation Date</InputLabel>
          <TextField
            type="date"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
              setDate(e.target.value);
              handleChangeDate('Date',e);
            }}
          ></TextField>
        </FormControl>
      </Box>

      <div
        style={{
          margin: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

          {data.length > 0 ? (
            data.map((val, key) => {
              return (
                <tr key={key}>
                  <td style={{ textAlign: "center" }}>{val.user.name}</td>
                  <td style={{ textAlign: "center" }}>{val.user.email}</td>
                  <td
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        border: "1px solid grey",
                        width: "200px",
                        height: "100px",
                        margin: 20,
                      }}
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
                            <td style={{ textAlign: "center" }}>
                              {input.nameInput}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {input.valueInput}
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {moment(val.created).format("YYYY-MM-DD")}
                  </td>
                </tr>
              );
            })
          ) : (
            <div> No data found </div>
          )}
        </table>
      </div>
    </div>
  );
}

export default TableUserSubmission;
