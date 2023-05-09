import React, { useEffect, useState } from "react";
import "./Trading.css";
import Navbar from "./Navbar";
import Nfc from "./Nfc";
import NfcScan from "./NfcScan";

const Trading = () => {
  const [player, setPlayer] = useState([
    {
      id: 1,
      name: "Laima Bedrīte",
      pointCount: 3,
    },
  ]);
  // This state will be changed to "" when correct API
  // will be implemented. For now there are problems
  // with current fake API

  useEffect(() => {
    GetNewPoints();
  }, []);

  const changePoints = (pointChange) => {
    var playerId = player[0].id;
    fetch("https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player", {
      method: "POST",
      body: JSON.stringify({ playerId, pointChange }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var body = JSON.stringify({ playerId, pointChange });
        console.log(body); // Example of post request
      })
      .catch((err) => {
        console.log(err.message);
      });
    GetNewPoints();
  };

  const GetNewPoints = () => {
    fetch("https://my-json-server.typicode.com/Ted-Rose/fake_api_No1/player")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayer(data);
      });
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center">
            <button className="w-50 btn btn-med btn-primary" id="scanButton">
              Skenēt
            </button>
            {/* <NfcScan></NfcScan> */}
            <h2>{player[0].name}</h2>
            <h3>{player[0].pointCount} punkti</h3>

            <div className="btn-group-lg center">
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
                onClick={() => changePoints(5)}
              >
                + 5
              </button>{" "}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trading;
