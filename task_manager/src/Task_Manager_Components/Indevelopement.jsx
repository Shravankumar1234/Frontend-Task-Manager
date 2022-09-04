import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "../taskManagerCss/AllComponents.css";
import { TaskList } from "./TaskList";
import { filterFunction } from "./commonFunctions";

export const Indevelopement = ({
  SetDragedItem,
  DraggedItem,
  SearchInput,
  SetSearchInput,
}) => {
  const [ShowCard1, SetCard1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notStartedItems, setNotStartedItems] = useState(
    JSON.parse(localStorage.getItem("InDevelopement")) || []
  );
  function drop(ev) {
    localStorage.setItem(
      "InDevelopement",
      JSON.stringify([...notStartedItems, DraggedItem])
    );
    setNotStartedItems((prev) => [...prev, DraggedItem]);
    ev.preventDefault();
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  const openCard1 = () => {
    SetCard1((prev) => !prev);
  };
  const[filteredItems, setFilteredItems] = useState([]);
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
      <div className="Task2">
        <h2>In Developement</h2>
        <hr />
        {loading && <div>Loading...</div>}
        {!loading && listItems?.map((el) => (
          <TaskList
            item={el}
            key={el.id}
            iAamFrom="InDevelopement"
            SetDragedItem={SetDragedItem}
            DraggedItem={DraggedItem}
            setNotStartedItems={setNotStartedItems}
            notStartedItems={listItems}
            SearchInput={SearchInput}
            SetSearchInput={SetSearchInput}
          />
        ))}
        <Card
          ShowCard={ShowCard1}
          SetCard={SetCard1}
          iAamFrom="InDevelopement"
          setNotStartedItems={setNotStartedItems}
        />

        <div className="Task_inner_div" onClick={openCard1}>
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
