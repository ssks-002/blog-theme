import PropTypes from 'prop-types';
import React from "react";
import { Link } from "gatsby";
/*must built-in {toc} by gatsby-transformer-rehype node.js generate*/

const TableOfContents = ({ toc, url }) => {

  return (
    <div className="toc">
      {toc && toc.map( h1  => {
        return(
        <ul>
        <Link to={`${url}#${h1.id}`} className="toc-h1">
          <h1>{h1.heading}</h1>
          </Link>
        {h1.items && h1.items.map( h2 => {
          return(
            <ul>
              <Link to={`${url}#${h2.id}`} className="toc-h2">
                <h2>{h2.heading}</h2>
                </Link>
              {h2.items && h2.items.map( h3 => {
              return(
                <ul>
                  <Link to={`${url}#${h3.id}`} className="toc-h3">{h3.heading}</Link>
                </ul>
              )
            })}
            </ul>
          )
        })}
        </ul>
        )
    })}
    </div>
  );
};

TableOfContents.propTypes = {
  toc: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
};


export default TableOfContents;