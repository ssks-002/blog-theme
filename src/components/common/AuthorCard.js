import * as React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { Link } from "gatsby";
import { LinkIcon, LocationMarkerIcon, ChevronRightIcon, ChevronUpIcon} from '@heroicons/react/outline'
import { TwitterIcon } from "../../../static/images/icons";


const AuthorCard = ({ author }) => {
    const url = `/author/${author.slug}`;
    const twitterUrl = author.twitter
    ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}`
    : null;
    const facebookUrl = author.facebook
    ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}`
    : null;
    const links = author.website.split(",")


    return (
        <div className="author-card">
            <MediaQuery query="(min-width: 800px)">
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
                        <LocationMarkerIcon className="author-card-location-icon"/>
                        <div className="author-card-link-name">{author.location && (author.location)}</div>
                    </div>
                    {twitterUrl && (
                        <a
                            className="author-card-link-item" id="twitter"
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <TwitterIcon className="author-card-link-icon"/>
                        <div className="author-card-link-name">
                            {author.twitter}
                        </div>   
                        </a>
                    )}
                    {facebookUrl && (
                        <a
                            className="author-card-link-item" id="facebook"
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <FacebookIcon className="author-card-link-icon"/>
                        <div className="author-card-link-name">
                            {author.facebook}
                        </div>         
                        </a>
                    )}
                    {links && (links.map( link => {
                        const shortlink = link.replace("https://www.","");
                        return(
                        <a
                            className="author-card-link-item" id="website"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <LinkIcon className="author-card-link-icon" id ="Website"/>
                        <div className="author-card-link-name">
                            {shortlink}
                        </div>
                        </a>
                    )}))}
                </div>
            </div>
            <Link to={url} className="author-card-chevronrighticon-container">
            <ChevronRightIcon className="author-card-chevronrighticon" />
            </Link>
            </MediaQuery>
            <MediaQuery query="(max-width: 800px)">
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
                        <LocationMarkerIcon className="author-card-link-icon"/>
                        <div className="author-card-link-name">{author.location && (author.location)}</div>   
                    </div>
                    {twitterUrl && (
                        <a
                            className="author-card-link-item" id="twitter"
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <TwitterIcon className="author-card-link-icon"/>
                        <div className="author-card-link-name">
                            {author.twitter}
                        </div>   
                        </a>
                    )}
                    {facebookUrl && (
                        <a
                            className="author-card-link-item" id="facebook"
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <FacebookIcon className="author-card-link-icon"/>
                        <div className="author-card-link-name">
                            {author.facebook}
                        </div>         
                        </a>
                    )}
                    {links && (links.map( link => {
                        const shortlink = link.replace("https://www.","");
                        return(
                        <a
                            className="author-card-link-item" id="website"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <LinkIcon className="author-card-link-icon" id ="Website"/>
                        <div className="author-card-link-name">
                            {shortlink}
                        </div>
                        </a>
                    )}))}
                </div>
                <Link to={url} className="author-card-chevronrighticon-container">
                    <ChevronUpIcon className="author-card-chevronrighticon"/>
                </Link>
            </div>
            </MediaQuery>
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