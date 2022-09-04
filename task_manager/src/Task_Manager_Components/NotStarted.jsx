import React, { useState } from "react";
import { Card } from "./Card";
import "../taskManagerCss/AllComponents.css";
import { TaskList } from "./TaskList";
import { filterFunction } from "./commonFunctions";
import { useEffect } from "react";
const NotStarted = ({
  SetDragedItem,
  DraggedItem,
  SearchInput,
  SetSearchInput,
}) => {
  const [ShowCard, SetCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notStartedItems, setNotStartedItems] = useState(
    JSON.parse(localStorage.getItem("notStarted")) || []
  );
  const [filteredItems, setFilteredItems]=useState([]);
  useEffect(() => {
    if(SearchInput){
      setLoading(true)
      const data = filterFunction(SearchInput, notStartedItems);
      setFilteredItems(data);
      setLoading(false)
    }
  },[SearchInput])
  
  function drop(ev) {
    localStorage.setItem(
      "notStarted",
      JSON.stringify([...notStartedItems, DraggedItem])
    );
    setNotStartedItems((prev) => [...prev, DraggedItem]);
    ev.preventDefault();
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }

  const openCard = () => {
    SetCard((prev) => !prev);
  };
  const listItems = SearchInput ? filteredItems : notStartedItems;

  return (
    <>
      <div
        className="Task_main_container"
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
      >
        <div className="Task1">
          <h2>Not Started</h2>
          <hr />
          {loading && <div>Loading...</div>}
          {!loading &&listItems?.map((el) => (
            <TaskList
              item={el}
              key={el.id}
              iAamFrom={"notStarted"}
              SetDragedItem={SetDragedItem}
              DraggedItem={DraggedItem}
              setNotStartedItems={setNotStartedItems}
              notStartedItems={listItems}
              SearchInput={SearchInput}
              SetSearchInput={SetSearchInput}
            />
          ))}
          <Card
            ShowCard={ShowCard}
            SetCard={SetCard}
            iAamFrom={"notStarted"}
            setNotStartedItems={setNotStartedItems}
          />

          <div className="Task_inner_div">
            <span
              class="material-symbols-outlined"
              style={{ fontSize: "30px", marginTop: "16px" }}
            >
              add
            </span>
            <h3 onClick={openCard}>Add New Task</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotStarted;
