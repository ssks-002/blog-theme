import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const TagCard = ({ tag }) => {
    const url = `/tag/${tag.slug}`;
    const color = `${tag.accent_color}`;

    return (
        <Link to={url} div className="tag-card"
            style={{
                border: `3px solid ${color}`,
            }} 
        >
            <div className="tag-card-name">{tag.name}</div>
        </Link>
    );
};

TagCard.propTypes = {
    tag: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        accent_color: PropTypes.string,
    }).isRequired,
};

export default TagCard;