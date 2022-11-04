import * as React  from "react";
import { useState, useEffect, useRef  } from 'react';
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, PostCard, ArchiveNav, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";
import { postsPerPage } from "../utils/siteConfig";
import { ChevronDoubleDownIcon } from '@heroicons/react/outline'

/**
 * Main index page
 */

const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;
    const {years, yearMonths, PostCounts} = pageContext

    //infinite scroll process

    const [list, setList] = useState([...posts.slice(0, postsPerPage)])
    const [loadMore, setLoadMore] = useState(false);
    const [hasMore, setHasMore] = useState(posts.length > postsPerPage)
    const [clickbutton, setClickbutton] = useState(false);
    const loadRef = useRef()
    const scrolloptions ={
        root: null,
        rootMargin: "20px",
        threshold: 1.0, 
    }

    const handleclick = () => {
        setClickbutton(true)
      }

    const handleloadMore = () => {
        setLoadMore(true)
    }

    const handleObserver = (entities) => {
        const target = entities[0]
        if (target.isIntersecting) {
            setLoadMore(true)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, scrolloptions)
        if (loadRef.current) {
            observer.observe(loadRef.current)
        }
    }, [loadRef.current])

    useEffect(() => {
    if (loadMore && hasMore) {
        const currentLength = list.length
        const isMore = currentLength < posts.length
        const nextResults = isMore
        ? posts.slice(currentLength, currentLength + postsPerPage )
        : []
        setList([...list, ...nextResults])
        setLoadMore(false)
        }
    }, [loadMore, hasMore]) 

    useEffect(() => {
        const isMore = list.length < posts.length
        setHasMore(isMore)
    }, [list]) 

    //


    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <main className="site-main">
                    <div className="container">
                        <div className="index-header-box">
                            <h2 className="index-header">Archives</h2>
                        </div>
                        <div className="Layout">
                            <section className="post-feed">
                                <div className="post-feed-container">
                                    <div className="post-feed-column">
                                        {list.map(({ node }, index ) => ( (index % 2 == 0) &&
                                            <PostCard  key={node.id} post={node} index={index} />
                                        ))}
                                    </div>
                                    <div className="post-feed-column">
                                        {list.map(({ node }, index ) => ( (index % 2 !== 0) &&
                                            <PostCard  key={node.id} post={node} index={index}/>
                                        ))}
                                    </div>
                                </div>
                                {clickbutton ? (
                                    <div ref={loadRef} className="post-feed-load" >
                                    {hasMore ? <p>Loading</p> : <p>ここまで&#x1F917;</p>}
                                    </div>
                                    ) : (
                                    hasMore && <button 
                                    className="post-feed-loadmore"  
                                    onClick= {() => {
                                        handleclick();
                                        handleloadMore();
                                    }}>
                                        <ChevronDoubleDownIcon className="post-feed-loadmore-item"/>
                                    </button>
                                    ) 
                                }
                            </section>
                            <div className="sidebar">
                                <div className="sidebar-container" id="1">
                                    <ArchiveNav years={years} yearMonths={yearMonths} PostCounts={PostCounts}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Index;


export const pageQuery = graphql`
    query GhostPostQuery{
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
