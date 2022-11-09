import * as React  from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { graphql } from "gatsby";
import { Layout, ArchiveNav, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page
 */

const Index = ({ data, location, pageContext }) => {
const posts = data.allGhostPost.edges;
const {years, yearMonths, PostCounts} = pageContext

return (
    <>
        <MetaData location={location} />
        <Layout isHome={true}>
            <MediaQuery query="(min-width: 800px)">
                <main className="site-main">
                    <div className="container">
                        <div className="index-header-box">
                            <h2 className="index-header">Archives</h2>
                        </div>
                        <div className="Layout">
                            <InfiniteScroll posts={posts} isHome={true}></InfiniteScroll>
                            <div className="sidebar">
                                <div className="sidebar-container" id="1">
                                    <div className="sidebar-box">
                                    <ArchiveNav years={years} yearMonths={yearMonths} PostCounts={PostCounts}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </MediaQuery>
            <MediaQuery query="(max-width: 800px)">
            <main className="site-main">
                    <div className="container">
                        <div className="index-header-box">
                            <h2 className="index-header">Archives</h2>
                        </div>
                            <InfiniteScroll posts={posts} isHome={true}></InfiniteScroll>
                    </div>
                </main>
            </MediaQuery>
        </Layout>
    </>
);
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Index;


export const pageQuery = graphql`
    query GhostPostQuery{
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
