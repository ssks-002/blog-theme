import * as React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "gatsby";
import { PrimaryTagCard } from "./";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";
import { ClockIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'

const PostCard = ({ post, options = {minute : "すぐ読めます" , minutes :"%分で読めます"} , index}) => {
    const url = `/post/${post.slug}/`;
    const readingTime = readingTimeHelper(post, options);
    const primary_tag = post.primary_tag;

    return (
        <article className="post-card idling">
            <div className="post-card-container" id="header">
                <Link to={url}>
                    <h2 className="post-card-title">{post.title}</h2>
                </Link>
                <div className="post-card-readingtime">
                <ClockIcon className="post-card-clock-icon"/>
                    <div>{readingTime}</div>
                </div>
                <figure className="post-card-publishedat-box">
                    <div className="post-card-publishedat">
                        {moment(post.published_at).format(`YYYY MM DD`)}
                    </div>
                </figure>
                {post.primary_tag && (
                    <div className="post-card-tags">
                        <PrimaryTagCard key={primary_tag.id} tag={primary_tag}/>
                    </div>
                )}       
            </div>
        <Link to={url}>
            {post.feature_image && (
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(${post.feature_image})`,
                    }}
                ></div>
            )}
            <div className="post-card-container" id="footer">
            <section className="post-card-excerpt">{post.excerpt}</section>
            <ArrowNarrowRightIcon className="post-card-arrowright-icon"/>
            </div>
        </Link>
        </article>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default PostCard;
