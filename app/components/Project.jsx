import React from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

import "./Project.scss";

const Project = props => {
  let showArticle = (props.layout === "article") ? true : false;
  let elementId = (showArticle) ? props.id + "-" + props.layout : props.id; // alternate id so that the getPosition function targets the in-list article element
  let imgAttrs = {height: "188px",  width: "280px",  alt: props.title, src: "/images/covers/300/" + props.id + "." + props.imagetype, className: "article-image"};

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

  if (showArticle) {
    /**
     * To lazy-load the cover image, we'll let it display the thumbnail to begin
     * with, asynchronously load the ideal cover image from the available set,
     * and replace the thumbnail with the cover image once it's loaded.
     *
     * To find the correct size, we'll find the current page width as an integer,
     * filter out the available cover sizes which are larger than the page width,
     * and work out which of those is the smallest.
     *
     * In case the screen is larger than the largest available cover size, we'll
     * make sure the Math.min is passed the largest size as an option, so the
     * list of options is never empty.
     */
    let pageWidth = parseInt(window.getComputedStyle(document.getElementById("app")).width), // current #app width as an integer
        coverSizes = [300, 600, 800, 1200, 1600], // cover sizes
        availableSizes = coverSizes.filter(size => size > pageWidth), // cover sizes larger than the page width
        largestSize = Math.max(...coverSizes), // largest available size
        coverSize = Math.min(...availableSizes, largestSize), // select the smallest available size
        cover = new Image();

    cover.src = `/images/covers/${coverSize}/${props.id}.${props.imagetype}`;
    cover.onload = () => {document.getElementById(elementId).querySelector(".article-image").src = cover.src};
  }

  return (
    <article id={elementId} className={props.className}>
      <Link to={props.to}>
        <img {...imgAttrs} />
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
