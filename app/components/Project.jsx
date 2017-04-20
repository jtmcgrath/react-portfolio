import React from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

import "./Project.scss";

const Project = props => {
  let showArticle = (props.layout === "article") ? true : false;
  let elementId = (showArticle) ? props.id + "-" + props.layout : props.id; // alternate id so that the getPosition function targets the in-list article element
  let cover = "/images/" + props.id + "." + props.imagetype;

  let title = (showArticle && props.url
    ? <a href={props.url} target="_blank">
        {props.title}
        <span className="visit-project">
          Visit {props.title}
        </span>
      </a>
    : props.title
  ); // title

  let header = (
    <header key="header">
      <h1>{title}</h1>
      <h2>{props.subtitle}</h2>
    </header>
  ); // header

  let article = ([
    header,
    <section key="article">
      {props.children}
    </section>
  ]); // article

  let imgAttrs = (showArticle
    ? {alt: props.title}
    : {height: "188px", width: "280px", alt: props.title}
  );

  return (
    <article id={elementId} className={props.className}>
      <Link to={props.to}>
        <img src={cover} {...imgAttrs} />
        {!showArticle && header}
      </Link>
      {showArticle && article}
    </article>
  ); // return
} // Project Component
Project.propTypes = {
  id: PropType.string.isRequired,
  to: PropType.string.isRequired,
  url: PropType.string,
  title: PropType.string.isRequired,
  layout: PropType.string.isRequired,
  content: PropType.string,
  subtitle: PropType.string.isRequired,
  imagetype: PropType.string.isRequired
} // Project.propTypes

export default Project;
