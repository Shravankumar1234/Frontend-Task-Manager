import React, { useEffect, useState } from "react";
import "../taskManagerCss/AllComponents.css";
import { TaskList } from "./TaskList";
import { Card } from "./Card";
import { filterFunction } from "./commonFunctions";

export const Completed = ({
  SetDragedItem,
  DraggedItem,
  SearchInput,
  SetSearchInput,
}) => {
  const [ShowCard2, SetCard2] = useState(false);
   const [loading, setLoading] = useState(false);
  const [notStartedItems, setNotStartedItems] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );

  function drop(ev) {
    let comment = prompt("Add Comment Here.....");
    const updatedItem = {...DraggedItem, comment}
    localStorage.setItem("completed", JSON.stringify([...notStartedItems, updatedItem]));
    setNotStartedItems((prev) => [...prev, updatedItem]);

    ev.preventDefault();
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }

  const openCard2 = () => {
    SetCard2((prev) => !prev);
  };

   const [filteredItems, setFilteredItems] = useState([]);
   useEffect(() => {
     if (SearchInput) {
       setLoading(true);
       const data = filterFunction(SearchInput, notStartedItems);
       setFilteredItems(data);
       setLoading(false);
     }
   }, [SearchInput]);
   const listItems = SearchInput ? filteredItems : notStartedItems;
  return (
    <div
      className="Task_main_container"
      onDrop={(e) => drop(e)}
      onDragOver={(e) => allowDrop(e)}
    >
      <div className="Task3">
        <h2>Completed</h2>
        <hr />
        {loading && <div>Loading...</div>}
        {!loading && listItems?.map((el, Index) => (
          <TaskList
            item={el}
            key={el.id}
            iAamFrom="completed"
            DraggedItem={DraggedItem}
            SetDragedItem={SetDragedItem}
            setNotStartedItems={setNotStartedItems}
            notStartedItems={listItems}
            SearchInput={SearchInput}
            SetSearchInput={SetSearchInput}
          />
        ))}

        <Card
          ShowCard={ShowCard2}
          SetCard={SetCard2}
          iAamFrom={"completed"}
          setNotStartedItems={setNotStartedItems}
        />

        <div className="Task_inner_div" onClick={openCard2}>
          <span
            class="material-symbols-outlined"
            style={{ fontSize: "30px", marginTop: "16px" }}
          >
            add
          </span>
          <h3>Add New Task</h3>
        </div>
      </div>
    </div>
  );
};
