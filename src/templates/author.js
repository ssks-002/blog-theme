import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";
import { LinkIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { TwitterIcon, FacebookIcon } from "../../static/images/icons";

/**
 * Author page 
 */

    const Author = ({ data, location }) => {
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
                    <div className="author-content-box">
                    <h1 className="author-name">{author.name}</h1>
                    {author.bio && <p className="author-bio">{author.bio}</p>}
                    </div>
                    <div  className="author-linkslocation">
                        <div className="author-location-item">
                            <LocationMarkerIcon className="author-link-icon"/>
                            <div className="author-link-name">
                                {author.location && (author.location)}
                            </div> 
                        </div>
                            {twitterUrl && (
                                <a
                                    className="author-link-item"
                                    id="twitter"
                                    href={twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                <TwitterIcon className="author-link-icon"/>
                                <div className="author-link-name">
                                    {author.twitter}
                                </div>  
                                </a>
                            )}
                            {facebookUrl && (
                                <a
                                    className="author-link-item"
                                    id="facebook"
                                    href={facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                <FacebookIcon className="author-link-icon"/>
                                <div className="author-link-name">
                                    {author.facebook}
                                </div> 
                                </a>
                            )}
                            {author.website && (
                                <a
                                    className="author-link-item" 
                                    id="website"
                                    href={author.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                <LinkIcon className="author-link-icon" id ="Website"/>
                                <div className="author-link-name">
                                    {author.website}
                                </div>
                                </a>
                            )}
                        </div>
                   
                </div>
                <div className="author-image-container">
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
              
                
                    <InfiniteScroll posts={posts} location="author"/>
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
