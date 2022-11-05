import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";
import { LinkIcon, LocationMarkerIcon, ChevronRightIcon } from '@heroicons/react/outline'

/**
 * Author page 
 */

    const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor;
    const posts = data.allGhostPost.edges;
    const twitterUrl = author.twitter
        ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = author.facebook
        ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
        : null;

    return (
        <>
            <MetaData data={data} location={location} type="profile" />
            <Layout isHome={true}>
            <main className="site-main">
            <div className="author-cover-image">
                {author.cover_image && (
                <img src={author.cover_image}/>
                )}
            </div>
            <div className="container">
                <div className="author-content">
                    <div className="auther-image-container">
                        {author.profile_image ? (
                            <img
                                className="author-image"
                                src={author.profile_image}
                            />
                        ) : (
                            <img
                                className="default-author-image"
                                src="/images/icons/avatar.svg"
                            />
                        )}
                    </div>
                    <h1>{author.name}</h1>
                    {author.bio && <p>{author.bio}</p>}
                    <div className="author-meta">
                        {author.website && (
                            <a
                                className="author-link-item"
                                href={author.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Website
                            </a>
                        )}
                        {twitterUrl && (
                            <a
                                className="author-link-item"
                                href={twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                        )}
                        {facebookUrl && (
                            <a
                                className="author-link-item"
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Facebook
                            </a>
                        )}
                    </div>
                </div>
                    <InfiniteScroll posts={posts}/>
                </div>
                </main>
            </Layout>
        </>
    );
};

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Author;

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
