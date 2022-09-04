import "./App.css";
import { useState } from "react";
import NotStarted from "./Task_Manager_Components/NotStarted";
import { Indevelopement } from "./Task_Manager_Components/Indevelopement";
import { Completed } from "./Task_Manager_Components/Completed";

function App() {
  const [DraggedItem, SetDragedItem] = useState({});
  const [SearchInput, SetSearchInput] = useState("");
  return (
    <>
      <div className="heading_div">
        <h1>Cyware DashBoard</h1>
        <hr style={{ width: "20%", marginTop: "-1%" }} />
      </div>
      <div className="Search_div">
        <input
          type="text"
          placeholder="Search Here......"
          value={SearchInput}
          onChange={(e) => SetSearchInput(e.target.value)}
        />
      </div>
      <div className="App">
        <NotStarted
          SetDragedItem={SetDragedItem}
          DraggedItem={DraggedItem}
          SearchInput={SearchInput}
          SetSearchInput={SetSearchInput}
        />
        <Indevelopement
          SetDragedItem={SetDragedItem}
          DraggedItem={DraggedItem}
          SearchInput={SearchInput}
          SetSearchInput={SetSearchInput}
        />
        <Completed
          SetDragedItem={SetDragedItem}
          DraggedItem={DraggedItem}
          SearchInput={SearchInput}
          SetSearchInput={SetSearchInput}
        />
      </div>
    </>
  );
}

export default App;
