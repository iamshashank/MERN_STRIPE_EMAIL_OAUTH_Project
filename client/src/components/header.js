import React from "react";
import { Link } from "react-router-dom";
import Payment from "./payment";

class Header extends React.Component {
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payment credits={this.props.auth.credits} />
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  renderLogo() {
    return this.props.auth ? (
      <Link
        className="brand-logo left"
        style={{ padding: "0 15px" }}
        to="/survey"
      >
        Emaily
      </Link>
    ) : (
      <Link className="brand-logo left" to="/">
        Emaily
      </Link>
    );
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          {this.renderLogo()}
          <ul id="nav-mobile" className="right">
            <li />
            {this.renderAuth()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
