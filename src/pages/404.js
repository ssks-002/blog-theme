import * as React from "react";
import { Link } from "gatsby";
import { Layout } from "../components/common";

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title" 
                    style={{fontSize : "10.0rem",
                            margin:"0",
                            color:"#8E8E8E"
                            }}
                >
                404
                </h1>
                <section className="content-body">
                <div>ページが見つかりませんでした</div> 
                <Link to="/" >トップへ戻る</Link>
                </section>
            </article>
        </div>
    </Layout>
);

export default NotFoundPage;
