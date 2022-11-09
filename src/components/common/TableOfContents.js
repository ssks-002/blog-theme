import PropTypes from 'prop-types';
import React from "react";
import { Link as Scroll } from 'react-scroll';
/*require toc-node generate by gatsby-transformer-rehype */

const TableOfContents = ({ toc }) => {

  return (
    <div className="toc">
      {toc && toc.map( h1  => {
        return(
        <>
        <Scroll href={`#${h1.id}`} to={`${h1.id}`} smooth={true} className="toc-item h1">{h1.heading}</Scroll>
        {h1.items && h1.items.map( h2 => {
          return(
            <>
              <Scroll href={`#${h2.id}`} to={`${h2.id}`} smooth={true} className="toc-item h2">{h2.heading}</Scroll>
              {h2.items && h2.items.map( h3 => {
              return(
                <>
                  <Scroll href={`#${h3.id}`} to={`${h3.id}`} smooth={true} className="toc-item h3">{h3.heading}</Scroll>
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
};


export default TableOfContents;