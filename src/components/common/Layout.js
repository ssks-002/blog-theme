import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { Navigation, HamburgerNav } from ".";

// Styles
import "../../styles/app.css";
import(`katex/dist/katex.min.css`);

/**
 * layout
 */

const DefaultLayout = ({ data, children, bodyClass, isHome, location, toc, years, yearMonths, PostCounts, prev, prevurl, next, nexturl }) => {
    const site = data.allGhostSettings.edges[0].node;
    const [scroll, setScroll] = useState(false);
    
    useEffect(() => {
        const siteheader = document.querySelector( ".site-head" );
        const siteheaderHeight = siteheader.clientHeight ;

        const handleScroll = () => {
            window.scrollY > siteheaderHeight
              ? setScroll(true)
              : setScroll(false)
            }

            

        window.addEventListener('scroll', handleScroll);
        
        if(scroll){
            const header = document.querySelector(".scroll-header");
            if(header){
            header.classList.add("show")
            }
        }else{
            const header = document.querySelector(".scroll-header.show");
            if(header){
            header.classList.remove("show")
            }
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        }, [scroll])

    return <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">
            <div className="viewport-top">
            <MediaQuery query="(min-width: 800px)">
                <header className="site-head" id={isHome ? "home" : "nohome"}>
                    <div className="container">
                    <div className="site-mast">
                            <Link to="/" className="site-mast-left">
                                <div>
                                    {site.title}
                                </div>
                            </Link>
                            <nav className="site-nav">
                                <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                            </nav>
                        </div>
                    </div>
                </header>
                <header className="scroll-header" id={isHome ? "home" : "nohome"}>
                    <div className="container">
                    <div className="site-mast">
                            <Link to="/" className="site-mast-left">
                                <div>
                                    {site.title}
                                </div>
                            </Link>
                            <nav className="site-nav">
                                <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                            </nav>
                        </div>
                    </div>
                </header>
            </MediaQuery>

            <MediaQuery query="(max-width: 800px)">
                <header className="site-head" id={isHome ? "home" : "nohome"}>
                    <div className="container">
                    <div className="site-mast">
                            <Link to="/" className="site-mast-left">
                                <div>
                                    {site.title}
                                </div>
                            </Link>
                            <nav className="site-nav">
                                <HamburgerNav data={site.navigation} location={location} toc={toc} years={years} yearMonths={yearMonths} PostCounts={PostCounts} prev={prev} prevurl={prevurl} next={next} nexturl={nexturl}/>
                            </nav>
                        </div>
                    </div>
                </header>
                <header className="scroll-header" id={isHome ? "home" : "nohome"}>
                    <div className="container">
                    <div className="site-mast">
                            <Link to="/" className="site-mast-left">
                                <div>
                                    {site.title}
                                </div>
                            </Link>
                            <nav className="site-nav">
                            <HamburgerNav data={site.navigation} location={location} toc={toc} years={years} yearMonths={yearMonths} PostCounts={PostCounts} prev={prev} prevurl={prevurl} next={next} nexturl={nexturl}/>
                            </nav>
                        </div>
                    </div>
                </header>
            </MediaQuery>
                {/* All the main content gets inserted here, surrund by <main className="site-main"></main> */}
                {children} 
            </div>

            <div className="viewport-bottom">
                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <div className="site-foot-nav container">
                        <div className="totop" >
                            <a href="#">ページトップ</a>
                        </div>
                        <div className="site-foot-nav-right">
                            <Link to="https://github.com/ssks-002/blog-theme">{site.title}</Link> © 2022-2024 
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
