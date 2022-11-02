import * as React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout, PrimaryTagCard, TagCard, RelatedPostCard, AuthorCard } from "../components/common";
import { MetaData } from "../components/common/meta";
import { CalendarIcon, RefreshIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

/**
 * post page
 */
const Post = ({ data, location, pageContext}) => {
    const { prev, next } = pageContext;
    const post = data.ghostPost;
    const tags = post.tags;
    const relateposts = data.relatepost.edges;
    const prevurl = `/post/${prev.slug}`;
    const nexturl = `/post/${next.slug}`;
    const childHtmlRehype = data.ghostPost.childHtmlRehype;

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <figure className="post-feature-image">
                    {post.feature_image &&  <img
                        src={post.feature_image}
                        alt={post.title}
                    />
                    }
                </figure>
                    <figure className="post-title-box">
                    <h1 className="post-title">{post.title}</h1>
                    </figure>
                    <div className="post-date-container">
                        <figure className="post-date-box" id ="published_at">
                        <CalendarIcon className="post-date-icon" id ="calender-icon"/>
                        <time  className="post-date">{moment(post.published_at).format(`YYYY年MM月DD日`)}</time>
                        </figure>
                        { (post.published_at !== post.updated_at) &&
                        <figure className="post-date-box"  id ="updated_at">
                        <RefreshIcon className="post-date-icon" id ="refresh-icon"/>
                        <time  className="post-date">{moment(post.updated_at).format(`YYYY年MM月DD日`)}</time>
                        </figure>
                        }
                    </div>
                    <main className="site-main">
                    <div className="container">
                    <div className="Layout">
                        <article className="content">
                            <div className="post-tag-list">
                            <PrimaryTagCard  tag={post.primary_tag}/>
                            { tags && tags.map(( value, index ) => (
                                ( index !== 0 ) && <TagCard tag={value} />                      
                                ))}
                            </div>
                            <section className="post-full-content">
                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                                
                            />
                            </section>
                            <div className="post-author">
                                <AuthorCard author={post.primary_author}/>
                            </div>
                            <div className="relate-posts">
                                <div className="relate-posts-box">
                                    <h1 className="relate-posts-headline">関連記事</h1>
                                </div>
                                {relateposts.length ? (
                                <section>
                                {relateposts.map(({ node }) => (
                                    <RelatedPostCard  post={node} />
                                ))}
                                </section>
                                ) : (   
                                <section>
                                    <p>ありませんでした &#x1F622;</p>
                                </section>
                                )}
                                
                            </div>
                        </article>
                        <div className="sidebar">
                            <div className="sidebar-container">
                                    {prev &&
                                    <Link to={prevurl} className="post-nav"> 
                                        <ChevronLeftIcon className="post-nav-icon" id="previous"/>
                                        <div className="post-nav-content" >
                                            <div className="post-nav-headline" >前の記事</div>
                                            {prev.title}
                                        </div>
                                    </Link>
                                    }
                                <div className="toc">
                                </div>
                                    {next &&
                                    <Link to={nexturl} className="post-nav">
                                        <div className="post-nav-content" >
                                            <div className="post-nav-headline" >次の記事</div>
                                            {next.title}
                                        </div>
                                        <ChevronRightIcon className="post-nav-icon" id="next"/>
                                    </Link>
                                    }
                            </div>
                        </div>
                    </div>
                    </div>
                </main>
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query ($slug: String!, $tag: String!) {
        ghostPost(slug: { eq: $slug }) {
            childHtmlRehype {
                html
                tableOfContents
            }
            tags {
                accent_color
              }
            primary_author {
                location
              }
            ...GhostPostFields
        }
        relatepost: allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: {
                tags: { elemMatch: { slug: { eq: $tag } } }
                slug: { ne: $slug }
            }
            limit: 3
          ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`;