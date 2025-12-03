import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Navigation, TableOfContents, ArchiveNav } from "../common";

/**
 * Navigation component
 */

const HamburgerNav = ({ data, location, toc, years, yearMonths, PostCounts, prev, prevurl, next, nexturl }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    };

    useEffect(() => {
        const screen = document.querySelector("body")
        if(isOpen && screen){
            screen.classList.add("opened")
        }

        const openedscreen = document.querySelector("body.opened")
        if(!isOpen && openedscreen){
            openedscreen.classList.remove("opened")
        }
    },[isOpen]);

    return(
        <>
        <button aria-label="drawerbutton" onClick={toggleDrawer}><MenuIcon/></button>
        {isOpen && 
            <>
            <label className="drawer-filter" />
            <div className="drawer" onClick={toggleDrawer}>
                <div className="drawer-container">
                    <button  className="drawer-nav-close">
                    <XIcon/>
                    </button>
                    <Navigation
                        data={data}
                        navClass="drawer-nav-item"
                    />
                    {(location == `post` || location == `page` ) && (
                    <div className="drawer-nav-item" >
                        <TableOfContents toc={toc} prev={prev} prevurl={prevurl} next={next} nexturl={nexturl} setIsOpen={setIsOpen} />
                    </div>
                    )}
                    {(location == `index` || location == `archive` || location == `page` ) && (
                    <div className="drawer-nav-item" >
                        <ArchiveNav years={years} yearMonths={yearMonths} PostCounts={PostCounts} />
                    </div>
                    )}
                </div>
            </div>
                </>
        }
        </>
    )

};

HamburgerNav.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    location: PropTypes.oneOf([`index`, `post`, `page`, `archive`]).isRequired,
    toc: PropTypes.any.isRequired,
    years: PropTypes.any.isRequired,
    yearMonths: PropTypes.any.isRequired,
    PostCounts: PropTypes.any.isRequired,
    prev: PropTypes.any.isRequired,
    prevurl: PropTypes.any.isRequired,
    next: PropTypes.any.isRequired, 
    nexturl: PropTypes.any.isRequired,
};

export default HamburgerNav;
