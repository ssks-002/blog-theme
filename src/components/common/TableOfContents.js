import PropTypes from 'prop-types';
import React from "react";
/*require generate by toc-node gatsby-transformer-rehype */

const TableOfContents = ({ toc, url }) => {

  return (
    <div className="toc">
      {toc && toc.map( h1  => {
        return(
        <ul>
        <a href={`#${h1.id}`} className="toc-h1">
          <h1>{h1.heading}</h1>
          </a>
        {h1.items && h1.items.map( h2 => {
          return(
            <ul>
              <a href={`#${h2.id}`} className="toc-h2">
                <h2>{h2.heading}</h2>
                </a>
              {h2.items && h2.items.map( h3 => {
              return(
                <ul>
                  <a href={`#${h3.id}`} className="toc-h3">{h3.heading}
                  </a>
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