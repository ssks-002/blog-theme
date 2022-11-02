import React from "react";

const Toc = props => {
  return (
    <div className="toc">
      <div
        className="toc__content"
        dangerouslySetInnerHTML={{
          __html: props.data,
        }}
      />
    </div>
  );
};

export default Toc;