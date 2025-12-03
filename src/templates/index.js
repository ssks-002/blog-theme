import * as React  from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { graphql } from "gatsby";
import { Layout, ArchiveNav, InfiniteScroll, PrimaryTagCard } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page
 */

const Index = ({ data, location, pageContext }) => {
const posts = data.allGhostPost.edges;
const tags = data.allGhostTag.edges;
const {years, yearMonths, PostCounts} = pageContext

return (
    <>
        <MetaData location={location} />
        <Layout isHome={true} location="index" years={years} yearMonths={yearMonths} PostCounts={PostCounts} >
            <MediaQuery query="(min-width: 800px)">
                <main className="site-main">
                    <div className="container">
                        <div className="index-header-box">
                            <h2 className="index-header">Archives</h2>
                        </div>
                        <div className="Layout">
                            <InfiniteScroll posts={posts} isHome={true}></InfiniteScroll>
                            <div className="index-header-box">
                                <h2 className="index-header">Tags</h2>
                            </div>
                            <section className="tag-list">
                            {tags && tags.map(({ node }) => (
                                <PrimaryTagCard key={node.id} tag={node} />
                            ))}
                            </section>
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
                        <div className="index-header-box">
                            <h2 className="index-header">Tags</h2>
                        </div>
                        <section className="tag-list">
                        {tags && tags.map(({ node }) => (
                            <PrimaryTagCard key={node.id} tag={node} />
                        ))}
                        </section>
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
        allGhostTag(
            sort: { order: DESC, fields: [count___posts] }
            filter: { visibility: { eq: "public" } }
        ) {
            edges {
                node {
                    name
                    accent_color
                    slug
                }
            }
        }
    }
`;
