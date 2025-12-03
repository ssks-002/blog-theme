import * as React from "react";
import { useEffect, useState  } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import moment from "moment";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout, PrimaryTagCard, TagCard, RelatedPostCard, AuthorCard, TableOfContents } from "../components/common";
import { MetaData } from "../components/common/meta";
import { CalendarIcon, RefreshIcon } from '@heroicons/react/outline'
import { FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon } from "react-share";
import { siteUrl } from "../utils/siteConfig"
import katex from 'katex';


/**
 * post page
 */

const Post = ({ data, location, pageContext}) => {

const { prev, next } = pageContext;
const borderRadius = 5;
const iconSize = 50;
const post = data.ghostPost;
const authorTwitter = post.primary_author.twitter.substring(1);
const tags = post.tags;
const fields = post.fields;
const relateposts = data.relatepost.edges;
const prevurl = `/post/${prev.slug}`;
const nexturl = `/post/${next.slug}`;
const toc = post.childHtmlRehype.tableOfContents;
const scrolloptions = {
    root: null, 
    rootMargin: "-10% 0px -80% 0px",
    threshold: 0.15
};
const [html, setHtml] = useState("");

useEffect(() => {
    // <br> を改行に戻す
    let mathHtml = post.html.replace(/<br\s*\/?>/gi, "\n");

    // インライン数式
    mathHtml = mathHtml.replace(/\$(.+?)\$/g, (_, math) =>
      katex.renderToString(math, { throwOnError: false })
    );

    // ブロック数式
    mathHtml = mathHtml.replace(/\$\$(.+?)\$\$/gs, (_, math) =>
      katex.renderToString(math, { displayMode: true, throwOnError: false })
    );

    setHtml(mathHtml);
  }, [post.html]);

useEffect(() => {
    const targetheadingh1  =  Array.from(document.querySelectorAll(".content-body > h1"));
    const targetheadingh2  =  Array.from(document.querySelectorAll(".content-body > h2"));
    const targetheadingh3  =  Array.from(document.querySelectorAll(".content-body > h3"));

    const targetheading = targetheadingh1.concat(targetheadingh2, targetheadingh3)

    const tochighlight = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentActive = document.querySelector(".toc-item.active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                const newActive = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (newActive) {
                    newActive.classList.add("active");
                }
            }
        })
    };

    const observer = new IntersectionObserver(tochighlight, scrolloptions)
    
    targetheading.forEach( target => {
        observer.observe(target);
    })
},[])

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout location="post" toc={toc} prev={prev} prevurl={prevurl} next={next} nexturl={nexturl}>
            <main className="site-main">
                <figure className="post-feature-image">
                    {post.feature_image &&  
                    <img src={post.feature_image}
                         alt={post.feature_image_alt ? post.feature_image_alt : post.title}
                         />
                    }
                </figure>
                <div className="container">
                <div className="post-title-container">
                    <h1 className="post-title">{post.title} </h1>
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
                </div>
                    <MediaQuery query="(min-width: 800px)">
                        <div className="Layout">
                            <article className="content">
                            <figcaption className="post-feature-image-caption">{post.feature_image_caption}</figcaption>
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
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                                </section>

                                <section className="share">
                                <div className="social-links__icon">
                                    <TwitterShareButton url={`${siteUrl}/post/${post.slug}/`} title={post.title} via={authorTwitter}>
                                        <TwitterIcon borderRadius={borderRadius} size={iconSize} />
                                    </TwitterShareButton>
                                </div>
                                <div className="social-links__icon">
                                    <FacebookShareButton url={`${siteUrl}/post/${post.slug}/`} >
                                        <FacebookIcon borderRadius={borderRadius} size={iconSize} />
                                    </FacebookShareButton>
                                </div>
                                </section>
                                <div className="post-author">
                                    <AuthorCard author={post.primary_author}/>
                                </div>
                                <div className="relate-posts">
                                    <h1 className="relate-posts-headline">関連記事</h1>
                                    {relateposts.length ? (
                                    <section>
                                    {relateposts.map(({ node }) => (
                                        <RelatedPostCard  id={node.id} post={node} />
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
                                    <div className="sidebar-box">
                                        <TableOfContents toc={toc} prev={prev} prevurl={prevurl} next={next} nexturl={nexturl}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>

                    <MediaQuery query="(max-width: 800px)">
                    <article className="content">
                        <figcaption className="post-feature-image-caption">{post.feature_image_caption}</figcaption>
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
                                    dangerouslySetInnerHTML={{ __html: fields.htmlKatex }}
                                />
                                </section>
                                
                                <section className="share">
                                <div className="social-links__icon">
                                    <TwitterShareButton url={`${siteUrl}/post/${post.slug}/`} title={post.title} via={authorTwitter}>
                                        <TwitterIcon borderRadius={borderRadius} size={iconSize} />
                                    </TwitterShareButton>
                                </div>
                                <div className="social-links__icon">
                                    <FacebookShareButton url={`${siteUrl}/post/${post.slug}/`} >
                                        <FacebookIcon borderRadius={borderRadius} size={iconSize} />
                                    </FacebookShareButton>
                                </div>
                                </section>
                                <div className="post-author">
                                    <AuthorCard author={post.primary_author}/>
                                </div>
                                <div className="relate-posts">
                                    <h1 className="relate-posts-headline">関連記事</h1>
                                    {relateposts.length ? (
                                    <section>
                                    {relateposts.map(({ node }) => (
                                        <RelatedPostCard  id={node.id} post={node} />
                                    ))}
                                    </section>
                                    ) : (   
                                    <section>
                                        <p>ありませんでした &#x1F622;</p>
                                    </section>
                                    )}
                                    
                                </div>
                            </article>
                    </MediaQuery>
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
    toc:PropTypes.string
};

export default Post;

export const postQuery = graphql`
    query ($slug: String!, $tag: String!) {
        ghostPost(slug: { eq: $slug }) {
            fields {
                htmlKatex
            }
            childHtmlRehype {
                htmlAst
                tableOfContents
            }
            tags {
                accent_color
              }
            primary_author {
                location
              }
            feature_image_caption
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