import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import moment from "moment";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout, AuthorCard, TableOfContents, ArchiveNav } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * page 
 */
const Page = ({ data, location, pageContext }) => {
const page = data.ghostPage;
const {years, yearMonths, PostCounts} = pageContext

const toc = page.childHtmlRehype.tableOfContents;
const scrolloptions = {
    root: null, 
    rootMargin: "0% 0px -80% 0px",
    threshold: 0 
};

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
            <MetaData data={data} location={location} type="website" />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout location="page" toc={toc} years={years} yearMonths={yearMonths} PostCounts={PostCounts} >
            <main className="site-main">
                <figure className="post-feature-image">
                    {page.feature_image &&  
                    <img src={page.feature_image}/>
                    }
                </figure>
                <div className="container">
                <div className="post-title-container">
                    <h1 className="post-title">{page.title} </h1>
                </div>
                    <MediaQuery query="(min-width: 800px)">
                    <div className="Layout">
                        <article className="content">
                            <section className="post-full-content">

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: page.html }}
                            />
                            
                            </section>
                            <div className="page-updateat">最終更新日 - {moment(page.updated_at).format(`YYYY年MM月DD日`)}</div>
                        <div className="post-author">
                                <AuthorCard author={page.primary_author}/>
                        </div>
                        </article>
                        <div className="sidebar">
                            <div className="sidebar-container" >
                                <div className="sidebar-box">
                                <TableOfContents toc={toc} />
                                </div>
                                <div className="sidebar-box">
                                <ArchiveNav years={years} yearMonths={yearMonths} PostCounts={PostCounts}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </MediaQuery>

                    <MediaQuery query="(max-width: 800px)">
                        <article className="content">
                            <section className="post-full-content">

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: page.html }}
                            />
                            
                            </section>
                            <div className="page-updateat">最終更新日 - {moment(page.update_at).format(`YYYY年MM月DD日`)}</div>
                        <div className="post-author">
                                <AuthorCard author={page.primary_author}/>
                        </div>
                        </article>
                    </MediaQuery>
                    </div>
                </main>
            </Layout>
        </>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Page;

export const postQuery = graphql`
    query ($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
            primary_author{
                location
            }
            childHtmlRehype {
                html
                tableOfContents
            }
        }
    }
`;
