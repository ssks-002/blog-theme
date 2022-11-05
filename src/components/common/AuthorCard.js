import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { LinkIcon, LocationMarkerIcon, ChevronRightIcon } from '@heroicons/react/outline'


const AuthorCard = ({ author }) => {
    const url = `/author/${author.slug}`;
    const twitterUrl = author.twitter
    ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
    : null;
    const facebookUrl = author.facebook
    ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
    : null;


    return (
        <div className="author-card">

            <div className="author-card-content">
                <div className="author-card-header">
                    <Link to={url} className="author-card-image-container">
                        {author.profile_image ? (
                            <img
                                className="author-card-image"
                                src={author.profile_image} />
                        ) : (
                            <img
                                className="default-author-card-image"
                                src="/images/icons/avatar.svg"
                            />
                        )}
                    </Link>
                    <div className="author-card-namebio">
                        <Link to={url} div className="author-card-name">{author.name}</Link>
                        <Link to={url} div className="author-card-bio">{author.bio && <p>{author.bio}</p>}</Link>
                    </div>
                </div>

                <div className="author-card-linkslocation">

                    <div className="author-card-location-item">
                        <LocationMarkerIcon className="author-card-links-icon"/>
                        <div className="author-card-links-name">
                            {author.location}
                        </div>   
                    </div>

                    {twitterUrl && (
                        <a
                            className="author-card-links-item" id="twitter"
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            className="author-card-links-icon"
                            src="/images/icons/twitter.svg"
                            alt="twitter"
                        />
                        <div className="author-card-links-name">
                            {author.twitter}
                        </div>   
                        </a>
                    )}

                    {facebookUrl && (
                        <a
                            className="author-card-links-item" id="facebook"
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <img
                            className="author-card-links-icon"
                            src="/images/icons/facebook.svg"
                            alt="facebook"
                        />
                        <div className="author-card-links-name">
                            {author.facebook}
                        </div>         
                        </a>
                        
                    )}

                    {author.website && (
                        <a
                            className="author-card-links-item" id="website"
                            href={author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <LinkIcon className="author-card-links-icon" id ="Website"/>
                        <div className="author-card-links-name">
                            {author.website}
                        </div>
                        </a>
                    )}
                </div>
            </div>
            <Link to={url} className="author-card-chevronrighticon-container">
            <ChevronRightIcon className="author-card-chevronrighticon" />
            </Link>
        </div>
    );
};

AuthorCard.propTypes = {
    author: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default AuthorCard;