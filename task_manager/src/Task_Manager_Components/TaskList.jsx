import React from "react";
import "../taskManagerCss/TaskList.css";
export const TaskList = ({
  item,
  iAamFrom,
  SetDragedItem,
  DraggedItem,
  setNotStartedItems,
  notStartedItems,
  SearchInput,
  SetSearchInput,
}) => {
  const { name, id, comment } = item;
  const dragStart = () => {
    SetDragedItem(item);
    const filterdata = notStartedItems.filter((val) => val.id !== item.id);
    setNotStartedItems(filterdata);
  };
  const handelDelete = (iAamFrom) => {
    const filterdata = notStartedItems.filter((val) => val.id !== item.id);
    localStorage.setItem(iAamFrom, JSON.stringify(filterdata));
    setNotStartedItems(filterdata);
  };
  return (
    <div className="TaskCard_div" draggable onDrag={() => dragStart()}>
      <div>
        <h2>{name}</h2>
      </div>
      {iAamFrom === "completed" ? (
        <>
          <div className="comment_main">
            <div className="comment_div">
              <span className="material-symbols-outlined">comment</span>
            </div>
            <span className="tooltiptext">{comment}</span>
          </div>
        </>
      ) : null}
      <div
        style={{
          marginTop: "20px",
          marginLeft: "10%",
          display: "flex",
          width: "30px",
        }}
      >
        <span
          class="material-symbols-outlined"
          style={{ marginTop: "7%", marginLeft: "10px", cursor: "pointer" }}
          onClick={() => handelDelete(id, iAamFrom)}
        >
          delete
        </span>
      </div>
    </div>
  );
};
