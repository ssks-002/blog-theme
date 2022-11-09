import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { Navigation, HamburgerNav } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";

/**
 * layout and animation 
 */

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;

    return <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">
            <div className="viewport-top">
                <header className="site-head" id={isHome ? "home" : "nohome"}>
                    <div className="container">
                    <div className="site-mast">
                            <Link to="/" className="site-mast-left">
                                <div>
                                    {site.logo ? (
                                        <img
                                            className="site-logo"
                                            src={site.logo}
                                            alt={site.title}
                                        />
                                    ) : (
                                        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt={site.title} />
                                    )}
                                </div>
                                <div>
                                    {site.title}
                                </div>
                            </Link>
                            <nav className="site-nav">
                                <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                                <HamburgerNav/>
                            </nav>
                        </div>
                    </div>
                </header>
                {/* All the main content gets inserted here, surrund by <main className="site-main"></main> */}
                {children} 
            </div>

            <div className="viewport-bottom">
                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <div className="site-foot-nav container">
                        <div className="site-foot-nav-right">
                            <Link to="/">{site.title}</Link> © 2022 
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </>;
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`query GhostSettings {
  allGhostSettings {
    edges {
      node {
        ...GhostSettingsFields
      }
    }
  }
  file(relativePath: {eq: "ghost-icon.png"}) {
    childImageSharp {
      gatsbyImageData(width: 30, height: 30, layout: FIXED)
    }
  }
}
`}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
