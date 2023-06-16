import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../home/menu";
import { toast } from "react-toastify";
function Pages() {
  const [Forms, setForms] = useState([]);
  const [IdPage, setIdPage] = useState();
  const params = useParams();

  const [Page, setPage] = useState({
    title: "",
    description: "",
    formName: "",
  });

  const handleChange = (name, e) => {
    setPage({ ...Page, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(params.id ) {
        const data = await Axios.put(
          "http://localhost:5000/page/updatePage/"+params.id,
        Page
        );
toast("Your page is updated ! ")
        return data;
      }


      const data = await Axios.post(
        "http://localhost:5000/page/createPage",
        Page
      );
toast("Your Page is submitted")
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('ici', params.id);
        if (params.id) {
          const result = await Axios.get(
            "http://localhost:5000/page/getonePage/" + params.id
          );
          setPage(result.data);
          console.log(result.data);
        }else{
          setPage({
            title: "",
            description: "",
            formName: "",
          })
        }

        const result = await Axios.get("http://localhost:5000/form/getForms");
        setForms(result.data);
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [params]);

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          height: "maxWidth",
          mt: 15,
          p: 10,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            
              <div
                style={{
                  margin: 20,
                  display: "flex",
                  fontSize: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {params.id ? 
"                Update Page" : "Add Page" }             </div>
           
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}>
                  <label for="title"> Title</label>
                </div>
                <div style={{ margin: 10, width: 200 }}>
                
                    <TextField
                      type="text"
                      placeholder="page title "
                      name="title"
                      value={Page.title}
                      onChange={(e) => handleChange("title", e)}
                    />
                 
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}>
                  <label for="description">Description</label>
                </div>
                <div style={{ margin: 10, width: 200 }}>
                    <TextField
                      type="text"
                      placeholder="description"
                      name="description"
                      value={Page.description}
                      onChange={(e) => handleChange("description", e)}
                    />
                 
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: 10, marginTop: 20, fontSize: 20 }}>
                  <label for="typeField">Forms</label>
                </div>
                <div>
                  <FormControl style={{ margin: 10, width: 200 }}>
                      <Select
                        labelId="select-5475"
                        id="select-5475"
                        value={`${Page?.formName?._id?.toString()||Page?.formName}`}
                        onChange={(e) => handleChange("formName", e)}
                      >
                        {Forms.map((e) => (
                          <MenuItem value={e._id} >{e.name}</MenuItem>
                        ))}
                      </Select>
                   
                  </FormControl>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
           
                <Button className="button" type="submit">    {params.id ?  "Update Page" : "Add Page"}</Button>
             
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default Pages;
