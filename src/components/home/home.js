import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/forms");
  };
  const handleClickViewForm = () => {
    Navigate("/listForms");
  };
  const handleClickViewPages = () => {
    Navigate("/listPages");
  };
  const handleClickPage = () => {
    Navigate("/pages");
  };
  
  return (

    <div>
      <div>
        <h2>Home</h2>
        <p>Welcome to Pga Home</p>
      </div>
      <div>
        <button onClick={handleClickViewForm}>View Forms</button>
        <button onClick={handleClickViewPages}>View Pages</button>

        <button onClick={handleClick}>Add Forms</button>
        <button onClick={handleClickPage}>Add Pages</button>
      </div>
    </div>
  );
}

export default Home;
