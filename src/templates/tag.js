import * as React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { graphql } from "gatsby";
import { Layout, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */

const Tag = ({ data, location }) => {
    const tag = data.ghostTag;
    const posts = data.allGhostPost.edges;

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <main className="site-main">
                    <figure className="tag-feature-image"
                        style={{
                            backgroundColor: `${tag.accent_color}`,
                        }}
                    >
                        { tag.feature_image && <img src={tag.feature_image}/> }
                    </figure>    
                    <MediaQuery query="(min-width: 800px)">
                    <div className="container">
                    <figure className="tag-header-box">
                    <h1 className="tag-name">
                        {tag.name}
                        <div className="tag-count">
                        &ndash;  {tag.postCount}件
                        </div>
                    </h1>
                    {tag.description ? <p className="tag-description">{tag.description}</p> : null}
                    </figure>
                    </div>
                    <InfiniteScroll posts={posts} location="tag"/>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 800px)">
                    <div className="container">
                        <figure className="tag-header-box">
                        <h1 className="tag-name">
                            {tag.name}
                            <div className="tag-count">
                            &ndash;  {tag.postCount}件
                            </div>
                        </h1>
                        {tag.description ? <p className="tag-description">{tag.description}</p> : null}
                        </figure>
                        <InfiniteScroll posts={posts} location="tag"/>
                    </div>
                    </MediaQuery>
                </main>
            </Layout>
        </>
    );
};

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Tag;

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
            accent_color
            postCount
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
