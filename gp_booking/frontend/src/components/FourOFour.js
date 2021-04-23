import { Link } from "@material-ui/core";
import React from "react";

class FourOFour extends React.Component {
  render() {
    return (
        <React.Fragment>
        <div class="container">
          <div class="row content">
            <div class="col-lg-12"></div>
            <div class="col-lg-12">
              <h1 className="he1">404</h1>
              <h2 className="he2">Oops, the page you're looking for does not exist.</h2>
              <p className="texter">
                You may want to head back to the homepage.
                If you think something is broken, report a problem.
              </p>
              <Link href="/">RETURN HOME</Link>
            </div>
          </div>
        </div>
        <div class="bg-img"></div>
        </React.Fragment>
    );
  }
}

export default FourOFour;
