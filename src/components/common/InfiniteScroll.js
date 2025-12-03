import PropTypes from 'prop-types';
import MediaQuery from "react-responsive";
import React ,{ useState, useEffect, useRef } from "react";
import { postsPerPage } from "../../utils/siteConfig";
import { PostCard } from "/";
import { ChevronDoubleDownIcon } from '@heroicons/react/outline'


const InfiniteScroll = ({ posts, location }) => {
    
    const [list, setList] = useState([...posts.slice(0, postsPerPage)])
    const [loadMore, setLoadMore] = useState(false);
    const [hasMore, setHasMore] = useState(posts.length > postsPerPage)
    const [clickbutton, setClickbutton] = useState(false);
    const loadRef = useRef()
    const scrolloptions ={
        root: null,
        rootMargin: "0px",
        threshold: .0, 
    }

    const handleclick = () => {
        setClickbutton(true)
      }

    const handleloadMore = () => {
        setLoadMore(true)
    }

    const handleObserver = (entries) => {
        const target = entries[0]
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
    }, [loadMore]) 

    useEffect(() => {
        const isMore = list.length < posts.length
        setHasMore(isMore)
    }, [list]) 


    useEffect(() => {
        const Postcard  =  Array.from(document.querySelectorAll(".post-card.idling"));
    
        const PostcardAnimation = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("idling");
                }
            })
        };
    
        const observer = new IntersectionObserver(PostcardAnimation, scrolloptions)
        
        Postcard.forEach( target => {
            observer.observe(target);
        })
    },[loadMore])

    return(
        <section className="post-feed" id={location ?  location : ""}>
            <MediaQuery query="(min-width: 800px)">
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
                    {hasMore ? <p>Loading</p> : <p>&#x1F917;</p>}
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
            </MediaQuery>
            <MediaQuery query="(max-width: 800px)">
            {list.map(({ node }) => (
                        <PostCard  key={node.id} post={node}/>
                        ))}
            {clickbutton ? (
                <div ref={loadRef} className="post-feed-load" >
                {hasMore ? <p>Loading</p> : <p>&#x1F917;</p>}
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
            </MediaQuery>

        </section>
    );
};

InfiniteScroll.propTypes = {
  posts: PropTypes.array.isRequired,
  location: PropTypes.string,
};


export default InfiniteScroll;