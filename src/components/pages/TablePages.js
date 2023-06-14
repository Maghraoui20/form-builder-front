import  Axios  from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function TablePages() {
    const [Pages, setPages] = useState([]);
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
    return (
       Pages.length > 0 ?
            <div className="container">
                <h2 className="">Page List </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Page ID</th>
                            <th>Page Title</th>
                            <th>Page description</th>
                            <th>Link Page</th>
                           

                        </tr>
                    </thead>
                    <tbody>

                         {Pages.map((page, index) =>
                            <tr align="center" key={index}>
                                <td align="center">{page._id}</td>
                                <td align="center">{page.title}</td>
                                <td align="center">{page.description}</td>
                                <td align="center"> <a href={`http://localhost:3000/page/${page._id}`}> Go to page</a></td>
                               

                               

                            </tr>)} 
                    </tbody>
                </table>
            </div> : <div><h1>Loading...</h1></div>
    );
}

export default TablePages;