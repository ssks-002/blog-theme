import PropTypes from 'prop-types';
import React from "react";
import { Link } from "gatsby";
/*must built-in {years}, {yearMonth}, {PostCounts} node.js generate*/

const ArchiveNav = ({ years, yearMonths, PostCounts }) => {

  return (
    <div className="archivenav">
      <div className="archivenav-headline">年月別アーカイブ</div>
      {years.map( years => {
        return (
          <ul>
            <Link to={`/archive/${years}`}>{years}年({PostCounts[years]})</Link>
          {yearMonths.map( yearMonths  => {
              const [year, month] = yearMonths.split('/');
                return (
                  (years == year) && (
                  <li>
                    <Link to={`/archive/${yearMonths}`}>{year}年{month}月({PostCounts[yearMonths]})</Link>
                  </li> 
                  ) 
                )
          })}
          </ul>
        )
      })}     
    </div>
  );
};

ArchiveNav.propTypes = {
  years: PropTypes.any.isRequired,
  yearMonths: PropTypes.any.isRequired,
  PostCounts: PropTypes.any.isRequired,
};


export default ArchiveNav;