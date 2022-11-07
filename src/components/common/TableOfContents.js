import PropTypes from 'prop-types';
import React from "react";
/*require toc-node generate by gatsby-transformer-rehype */

const TableOfContents = ({ toc, url }) => {

  return (
    <div className="toc">
      {toc && toc.map( h1  => {
        return(
        <>
        <a href={`#${h1.id}`} className="toc-item h1">{h1.heading}</a>
        {h1.items && h1.items.map( h2 => {
          return(
            <>
              <a href={`#${h2.id}`} className="toc-item h2">{h2.heading}</a>
              {h2.items && h2.items.map( h3 => {
              return(
                <>
                  <a href={`#${h3.id}`} className="toc-item h3">{h3.heading}</a>
                </>
              )
            })}
            </>
          )
        })}
        </>
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