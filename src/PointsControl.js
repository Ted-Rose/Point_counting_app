import React from "react";

function PointsControl(props) {
  const handleOnChange = (id) => {
    console.log("Changing");

    props.changeUpdatedCheckedState(id);
  };

  return (
    <div className="list-group list-group-checkable d-grid gap-2 border-0 w-auto">
      <input
        type="checkbox"
        checked={props.selectedTeamId === props.id}
        onChange={() => handleOnChange(props.id)}
      />
      <label
        className="list-group-item rounded-3 py-3"
        htmlFor="listGroupCheckableRadios1"
      >
        <div className="d-flex gap-2 w-100 justify-content-between">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMUxWz1t3EWprdLje0Qhx7TfkPGq_HEI5x-xfwVFfbqA&s"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0"
          />
          <div>
            <h6 className="mb-0">{props.teamName}</h6>
          </div>
          <p>count</p>
          <p>{props.count}</p>
          <p>checked: {props.key}</p>
        </div>
      </label>

      {/* Add more points controls as needed */}
    </div>
  );
}

export default PointsControl;
