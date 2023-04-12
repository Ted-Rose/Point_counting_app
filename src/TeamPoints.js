import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PointsControl from "./PointsControl";

const TeamPoints = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(1);

  const changeUpdatedCheckedState = (updatedCheckedState) => {
    setSelectedTeamId(updatedCheckedState);
  };

  useEffect(() => {
    GetNewPoints();
  }, []);

  const changePoints = (pointChange) => {
    fetch("https://my-json-server.typicode.com/Ted-Rose/json/teams", {
      method: "POST",
      body: JSON.stringify({ selectedTeamId, pointChange }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        var body = JSON.stringify({ selectedTeamId, pointChange });
        console.log(body); // Example of post request
      })
      .catch((err) => {
        console.log(err.message);
      });
    GetNewPoints();
  };

  const GetNewPoints = () => {
    fetch("https://my-json-server.typicode.com/Ted-Rose/json/teams")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTeams(data);
      });
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            <p className="lead">Pievieno vai noņem punktus komandai</p>
            <div className="btn-group-lg center lg-1">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary btn-outline-danger"
                onClick={() => changePoints(-5)}
              >
                - 5
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-5 btn-outline-success"
                onClick={() => changePoints(+5)}
              >
                + 5
              </button>
            </div>
          </div>
          {teams.map(({ id, name, pointCount }, index) => (
            <PointsControl
              key={id}
              count={pointCount}
              teamName={name}
              id={id}
              changeUpdatedCheckedState={changeUpdatedCheckedState}
              selectedTeamId={selectedTeamId}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeamPoints;
