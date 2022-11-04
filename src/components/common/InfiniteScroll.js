import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import { postsPerPage } from "../utils/siteConfig";
import { ChevronDoubleDownIcon } from '@heroicons/react/outline'
import { Layout, PostCard, ArchiveNav, InfiniteScroll } from "../components/common";


const InfiniteScroll = ({ posts }) => {
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


  return (
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
  );
};

InfiniteScroll.propTypes = {
  posts: PropTypes.array.isRequired,
};


export default InfiniteScroll;