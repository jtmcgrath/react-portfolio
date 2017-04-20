import React from "react";

import Project from "components/Project";
import Loading from "components/Loading";
import getPosition from "js/getPosition";

import "./Page.scss";

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = { position: null };

    let that = this, methods = ["resetPosition", "getPagePosition"];
    methods.forEach(method => this[method] = that[method].bind(this));
    // bind context to methods
  } // constructor

  componentWillMount() {
    this.resetPosition();
  } // componentWillMount

  componentWillUnmount() {
    this.resetPosition();
  } // componentWillMount

  resetPosition() {
    this.setState({position: this.getPagePosition()});
  } // resetPosition

  getPagePosition() {
    let element = document.getElementById(this.props.id);

    return (!element || this.props.type !== "project"
      ? {top: "100%", left: "0", right: "0", bottom: "auto"}
      : getPosition(element)
    );
  } // getPagePosition

  render() {
    let content = <div dangerouslySetInnerHTML={{__html: this.props.content}} /> || <Loading />;
    let position = this.state.position || this.getPagePosition();

    content = (this.props.type === "project"
      ? <Project layout="article" to="/" {...this.props}>
          {content}
        </Project>
      : <article>
          {content}
        </article>
    );

    return (
      <main style={position} id="current-article">
        {content}
      </main>
    );
  } // render
} // Page Component

export default Page;
