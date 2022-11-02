import * as React  from "react";
import {useState} from 'react';
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Layout, PostCard, ArchiveNav } from "../components/common";
import { MetaData } from "../components/common/meta";
import InfiniteScroll from "react-infinite-scroller";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

/**
 * archive page
 */

const Archive = ({ data, location, pageContext }) => {
    const { prevyearmonth, nextyearmonth, prevyear, nextyear, currentyear, currentmonth, years, yearMonths, PostCounts } = pageContext;
    const posts = data.allGhostPost.edges;

    const itemsPerPage = 4;
    const [hasMoreItems, sethasMoreItems] = useState(true);
    const [records, setrecords] = useState(itemsPerPage);

    const loadMore = () => {
        if (records >= posts.length) {
          sethasMoreItems(false);
        } else {
          setTimeout(() => {
            setrecords(records + itemsPerPage);
          }, 500);
        }
      };

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
            <main className="site-main">
                <div className="container">
                    <div className="archive-header">
                        <div className="archive-header-box">
                            {   currentmonth ?
                                <h2 className="archive-headline">{currentyear}年{currentmonth}月</h2> :
                                <h2 className="archive-headline">{currentyear}年</h2>
                            }
                            <h4 className="archive-header-postcounts">&ndash;  {posts.length}件</h4>
                        </div>
                    </div>
                <div className="Layout">
                <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasMoreItems}
                    useWindow={true}
                >  
                    <section className="post-feed">
                        <div className="post-feed-column">
                            {posts.map(({ node }, index ) => ( (index % 2 == 0) &&
                                <PostCard  post={node} />
                            ))}
                        </div>
                        <div className="post-feed-column">
                            {posts.map(({ node }, index ) => ( (index % 2 !== 0) &&
                                <PostCard  post={node} />
                            ))}
                        </div>
                    </section>
                </InfiniteScroll>
                <div className="sidebar">
                    <div className="sidebar-container">
                        <div className="archive-nav">
                        <Link to={`/`} className="archive-nav-content" id="totop" >トップに戻る</Link>
                            <div className="archive-nav-items">
                            {   currentmonth ? (
                                <>  
                                    {prevyearmonth &&
                                    <Link to={`/archive/${prevyearmonth}`} className="archive-nav-content">
                                        <ChevronLeftIcon className="archive-nav-icon" id="previous" />
                                        <div className="post-nav-headline">前月</div>
                                    </Link>
                                    }
                                
                                    {nextyearmonth &&
                                    <Link to={`/archive/${nextyearmonth}`} className="archive-nav-content">
                                        <div className="post-nav-headline">次月</div>
                                        <ChevronRightIcon className="archive-nav-icon" id="next" />
                                    </Link>
                                    }
                                </>
                                ) : (
                                <>  
                                    {prevyear &&
                                    <Link to={`/archive/${prevyear}`} className="archive-nav-content">
                                        <ChevronLeftIcon className="archive-nav-icon" id="previous" />
                                        <div className="post-nav-headline">前年</div>
                                    </Link>
                                    }
                                
                                    {nextyear &&
                                    <Link to={`/archive/${nextyear}`} className="archive-nav-content">
                                        <div className="post-nav-headline">次年</div>
                                        <ChevronRightIcon className="archive-nav-icon" id="next" />
                                    </Link>
                                    }
                                </>    
                                )   
                            }
                            </div>
                        </div>
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

Archive.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Archive;

// This page query loads all posts match each year/yearmonth

export const pageQuery = graphql`
    query GhostArchivePostQuery($periodStartDate: Date, $periodEndDate: Date){
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { published_at: { gte: $periodStartDate, lt: $periodEndDate } }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
