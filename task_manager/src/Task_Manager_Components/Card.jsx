import React, { useState } from "react";
import "../taskManagerCss/Card.css"
import { v4 as uuidv4 } from "uuid";

export const Card = ({ ShowCard, SetCard, iAamFrom, setNotStartedItems }) => {
  const [InputValues, SetInput] = useState({
    id: uuidv4(),
    name: "",
    assignedMember: "",
  });
  const [ListItems, SetListItems] = useState(
    JSON.parse(localStorage.getItem(iAamFrom)) || []
  );
  const handleAddCard = () => {
    localStorage.setItem(iAamFrom, JSON.stringify([...ListItems, InputValues]));
    setNotStartedItems((oldItems) => [...oldItems, InputValues]);
    SetListItems((oldItems) => [...oldItems, InputValues]);
    SetInput("");
    SetCard((prev) => !prev);
  };
  const setInputs = (changedValue) => {
    const updatedValues = { ...InputValues, ...changedValue };
    SetInput(updatedValues);
  };
  return (
    <>
      {ShowCard ? (
        <div className="Card_Main_div">
          <textarea
            type="text"
            placeholder="Enter Description..."
            value={InputValues.name}
            onChange={(e) => setInputs({ id: uuidv4(), name: e.target.value })}
          />
          <div className="Card_inner_div">
            <button onClick={handleAddCard}>Add Card</button>
            <span
              class="material-symbols-outlined"
              style={{ marginTop: "2px", cursor: "pointer" }}
              onClick={() => SetCard((prev) => !prev)}
            >
              close
            </span>
             <span class="material-symbols-outlined" style={{marginTop:"1%"}}>attachment</span>
          </div>
         
        </div>
      ) : null}
    </>
  );
};
