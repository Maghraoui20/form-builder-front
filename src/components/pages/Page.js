import { Container, Paper } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
function Pages() {
  const [Forms, setForms] = useState([]);
  const [IdPage, setIdPage] = useState();

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
      const data = await Axios.post(
        "http://localhost:5000/page/createPage",
        Page
      );
      console.log(data, "data");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
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
                <label for="title"> Title</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  placeholder="page title "
                  name="title"
                  onChange={(e) => handleChange("title", e)}
                />
              </div>
            </div>
            <div>
              <div>
                <div className="row">
                  <div className="col-25">
                    <label for="description">Description</label>
                  </div>
                  <div className="col-75">
                    <input
                      type="text"
                      placeholder="description"
                      name="description"
                      onChange={(e) => handleChange("description", e)}
                    />
                  </div>
                </div>
               
                <div className="row">
                  <div className="col-25">
                    <label for="typeField">Forms</label>
                  </div>
                  <div className="col-75">
                    <select
                      name="formName"
                      onChange={(e) => handleChange("formName", e)}
                    >
                      {Forms.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <button className="button">submit Page</button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default Pages;
