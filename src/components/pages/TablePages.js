/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
function TablePages() {
  const [Pages, setPages] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Axios.get("http://localhost:5000/page/getPages");
        setPages(result.data);
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleUpdate =(id)=>{
    Navigate(`/pages/${id}`)
  }
  const handleDelete =async(id)=>{
    console.log(id);
    try {
       await Axios.delete("http://localhost:5000/page/"+id);
       window.location.reload();
    } catch (e) {
      console.log(e);
    }
    }
  return Pages.length > 0 ? (
    <div className="container">
      <div
        style={{
          margin: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        List of Pages
      </div>{" "}
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
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid black" }}>Page ID</th>
              <th style={{ borderBottom: "1px solid black" }}>Page Title</th>
              <th style={{ borderBottom: "1px solid black" }}>
                Page description
              </th>
              <th style={{ borderBottom: "1px solid black" }}>Link Page</th>
              <th style={{ borderBottom: "1px solid black" }}>Update</th>
              <th style={{ borderBottom: "1px solid black" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Pages.map((page, index) => (
              <tr align="center" key={index}>
                <td style={{ textAlign: "center" }}>{page._id}</td>
                <td style={{ textAlign: "center" }}>{page.title}</td>
                <td style={{ textAlign: "center" }}>{page.description}</td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <a href="#" onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:3000/page/${page._id}`)
                    alert('saved in your clipboard')
                    }}
>
                    {" "}
                    link page
                  </a>
                </td>

                <td style={{ textAlign: "center" }}>
                  <Button onClick={() => handleUpdate(page._id)}
                  >
                    Update
                  </Button>
                </td>

                <td style={{ textAlign: "center" }}>
                  <Button onClick={() => handleDelete(page._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default TablePages;
