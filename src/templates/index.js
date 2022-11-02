import * as React  from "react";
import {useState} from 'react';
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Layout, PostCard, ArchiveNav } from "../components/common";
import { MetaData } from "../components/common/meta";
import InfiniteScroll from "react-infinite-scroller";

/**
 * Main index page (home page)
 */

const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;
    const {years, yearMonths, PostCounts} = pageContext

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
                        <div className="index-header-box">
                            <h2 className="index-header">Archives</h2>
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
                                    <PostCard  key={node.id} post={node} index={index} />
                                ))}
                            </div>
                            <div className="post-feed-column">
                                {posts.map(({ node }, index ) => ( (index % 2 !== 0) &&
                                    <PostCard  key={node.id} post={node} index={index}/>
                                ))}
                            </div>
                        </section>
                    </InfiniteScroll>
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
