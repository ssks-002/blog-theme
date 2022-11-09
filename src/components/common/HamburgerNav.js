import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { MenuIcon, XIcon } from '@heroicons/react/outline'

/**
 * Navigation component
 */

const HamburgerNav = ({ data, navClass }) => {
    const [open, setOpen] = useState(false);
    const toggleFunction = () => {
        setOpen((prevState) => !prevState);
      };
    
    return(
        open ?(
        <button>
            <XIcon
                onClick={toggleFunction}
            />
        </button>
        ) : (
        <button>
            <MenuIcon
                onClick={toggleFunction}
            />
         </button>
        )
    )

};

HamburgerNav.defaultProps = {
    navClass: `site-nav-item`,
};

HamburgerNav.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    navClass: PropTypes.string,
};

export default HamburgerNav;
