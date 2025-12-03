import * as React  from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { graphql, Link } from "gatsby";
import { Layout, ArchiveNav, InfiniteScroll } from "../components/common";
import { MetaData } from "../components/common/meta";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

/**
 * archive page
 */

const Archive = ({ data, location, pageContext }) => {
    const { prevyearmonth, nextyearmonth, prevyear, nextyear, currentyear, currentmonth, years, yearMonths, PostCounts } = pageContext;
    const posts = data.allGhostPost.edges;

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} location="archive" years={years} yearMonths={yearMonths} PostCounts={PostCounts}>
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
                <MediaQuery query="(min-width: 800px)">
                <div className="Layout">
                
                    <InfiniteScroll posts={posts} isHome={true}/>
                    <div className="sidebar">
                        <div className="sidebar-container">
                            <div className="sidebar-box">
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
                </MediaQuery>
                
                <MediaQuery query="(max-width: 800px)">
                    <InfiniteScroll posts={posts} isHome={true}/>
                </MediaQuery>
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

// loads all posts match each year/yearmonth

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
