import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PrimaryTagCard = ({ tag }) => {
    const url = `/tag/${tag.slug}`;

    return (
        <Link to={url} className="primary-tag-card">
            <div className="primary-tag-card-name">{tag.name}</div>
        </Link>
    );
};

PrimaryTagCard.propTypes = {
    tag: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default PrimaryTagCard;