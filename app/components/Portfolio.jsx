import _ from "lodash";
import React from "react";
import axios from "axios";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from "components/Menu";
import Page from "components/Page";
import Header from "components/Header";
import Footer from "components/Footer";
import AboutMe from "components/AboutMe";
import Loading from "components/Loading";
import Project from "components/Project";
import scrollTo from "js/scrollTo";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      index: null
    };

    let that = this, modules = ["parseIndex", "getPage", "getPageContent"];
    modules.forEach(module => this[module] = that[module].bind(this));
    // bind context to methods
  } // constructor

  componentDidMount() {
    axios.get("/api/index.json")
         .then(response => response.data)
         .then(data => this.setState({
           index: this.parseIndex("url", data),
           content: this.parseIndex("group", data)
         }));
  } // componentDidMount

  parseIndex(type, data) {
    let parsers = {
      group: function(result, page, name) {
        result[page.type] = result[page.type] || {};
        result[page.type][name] = page;
        result[page.type][name].content = null;
      },
      url: function(result, page, name) {
        result[name] = page.type;
      }
    } // parsers

    return _.transform(data, parsers[type]);
  } // parseIndex

  getPage(target) {
    target = (this.state.index[target] === undefined) ? "404" : target;
    let contentType = this.state.index[target];
    let pageInfo = this.state.content[contentType][target];
    pageInfo.content = (pageInfo.content === null) ? this.getPageContent(contentType, target) : pageInfo.content;

    return pageInfo;
  } // getPage

  getPageContent(contentType, target) {
    axios.get("/api/" + target + ".html")
         .then(response => response.data)
         .then(response => {
           let currentState = this.state;
           currentState.content[contentType][target].content = response;
           this.setState(currentState);
         });
  } // getPageContent

  objToArr(obj) {
    return _.transform(obj, function(result, value, key) {
      value.id = key;
      result.push(value);
    }, []);
  } // objToArr

  scrollToTop() {
    let element = document.getElementById('current-article');
    if (element) {scrollTo(element, 0, 300)}
  } // scrollToTop

  render() {
    if (!this.state.content) {
      return (
        <div id="splash">
          <p>Joe McGrath</p>
          <Loading />
        </div>
      );
    }

    let projects = this.objToArr(this.state.content.project), pages = this.objToArr(this.state.content.page);

    return (
      <Router>
        <Route render={({location, match}) => (
          <div>
            <Header>
              <Menu pages={pages} />
            </Header>
            <AboutMe />
            <section className="project-list">
              {projects.map(project =>
                <Project key={project.id} layout="card" to={"/" + project.id} {...project} />
              )}
            </section>
            <Footer />
            <CSSTransitionGroup component="div" transitionName="example" transitionEnterTimeout={10} transitionLeaveTimeout={400}>
              <Route
                location={location}
                key={location.pathname}
                path="/:page"
                render={props => {this.scrollToTop(); return <Page {...this.getPage(props.match.params.page)}/>}}
                />
            </CSSTransitionGroup>
          </div>
        )} />
      </Router>
    );
  } // render
} // Portfolio Component

export default Portfolio;
