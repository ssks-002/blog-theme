import PropTypes from 'prop-types';
import React from "react";
import { Link as Scroll } from 'react-scroll';
import { Link } from "gatsby";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

/*require toc-node generate by gatsby-transformer-rehype */

const TableOfContents = ({ toc, prev, prevurl, next, nexturl, toggleDrawer }) => {

  return (
    <>
    {prev &&
      <Link to={prevurl} className="post-nav"> 
          <ChevronLeftIcon className="post-nav-icon" id="previous"/>
          <div className="post-nav-content" >
              <div className="post-nav-headline" >前の記事</div>
              {prev.title}
          </div>
      </Link>
    }
    {next &&
      <Link to={nexturl} className="post-nav">
          <div className="post-nav-content" >
              <div className="post-nav-headline" >次の記事</div>
              {next.title}
          </div>
          <ChevronRightIcon className="post-nav-icon" id="next"/>
      </Link>
    }
    <div className="toc" >
      {toc && toc.map( h1  => {
        return(
        <>
        <Scroll href={`#${h1.id}`} to={`${h1.id}`} smooth={true} offset={-120} className="toc-item h1" onClick={toggleDrawer}>{h1.heading}</Scroll>
        {h1.items && h1.items.map( h2 => {
          return(
            <>
              <Scroll href={`#${h2.id}`} to={`${h2.id}`} smooth={true} offset={-120} className="toc-item h2" onClick={toggleDrawer}>{h2.heading}</Scroll>
              {h2.items && h2.items.map( h3 => {
              return(
                <>
                  <Scroll href={`#${h3.id}`} to={`${h3.id}`} smooth={true} offset={-120} className="toc-item h3" onClick={toggleDrawer}>{h3.heading}</Scroll>
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
    </>
  );
};

TableOfContents.propTypes = {
  toc: PropTypes.any.isRequired,
  prev: PropTypes.any.isRequired,
  prevurl: PropTypes.any.isRequired,
  next: PropTypes.any.isRequired, 
  nexturl: PropTypes.any.isRequired,
  toggleDrawer: PropTypes.func,
};


export default TableOfContents;