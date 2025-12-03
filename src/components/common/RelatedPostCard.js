import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

const RelatedPostCard = ({ post }) => {
    const url = `/post/${post.slug}/`;

    return (
        <article className="related-post-card">
            <Link to={url} div className="related-post-card-container">
                <h2 className="related-post-card-title">{post.title}</h2>
            <ArrowNarrowRightIcon className="related-post-card-arrowright-icon"/>
            </Link>
        </article>
    );
};

RelatedPostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default RelatedPostCard;
