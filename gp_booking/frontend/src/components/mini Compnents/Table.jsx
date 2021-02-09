import React from "react";

import { func } from "prop-types";

const Tables = ({ titles, body }) => {
  function makeCell(title) {
    return <th style={{ borderStyle: "dashed" }}>{title}</th>;
  }
  // function makeBody(data) {
  //     console.log(data);
  // }

  return (
    <table>
      <thead>
        <tr>{titles.map(makeCell)}</tr>
      </thead>
      <tbody>
        {body.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.rank}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
