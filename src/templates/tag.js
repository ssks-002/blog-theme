import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag;
    const posts = data.allGhostPost.edges;

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <figure className="tag-feature-image"
                    style={{
                        backgroundColor: `${tag.accent_color}`,
                    }}
                >
                    { tag.feature_image && <img
                        src={tag.feature_image}
                        alt={tag.title}
                    />
                    }
                </figure>
                <figure className="tag-header-box">
                <h1 className="tag-name">
                    {tag.name}
                    <div className="tag-count">
                    &ndash;  {tag.postCount}件
                    </div>
                </h1>
                {tag.description ? <p className="tag-description">{tag.description}</p> : null}
                </figure>
              
                <div className="container">
                <section className="post-feed" id="tag">
                        <div className="post-feed-column">
                            {posts.map(({ node }, index ) => ( (index % 2 !== 0) &&
                                <PostCard  key={node.id} post={node} />
                            ))}
                        </div>
                        <div className="post-feed-column">
                            {posts.map(({ node }, index ) => ( (index % 2 == 0) &&
                                <PostCard  key={node.id} post={node} />
                            ))}
                        </div>
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
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
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
            accent_color
            postCount
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
