import React from 'react'

import { func } from 'prop-types';



const Tables = (props) => {

    function makeCell(title) {

        return (
            <th style={{ borderStyle: "dashed" }}>{title}</th>
        )
    }
    function makeBody(data) {
        console.log(data);
    }


    return (

        <table>
            <thead>
                <tr>{props.titles.map(makeCell)}</tr>
            </thead>
            <tbody>
                <tr>{props.body.map(makeCell)}</tr>
            </tbody>
        </table>
    )
}

export default Tables