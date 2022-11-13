const React = require("react");

function FacebookIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill:  fill="currentColor",
    viewBox: "0 0 24 24",
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M452,0H60C26.92,0,0,26.92,0,60V452c0,33.08,26.92,60,60,60H452c33.08,0,60-26.92,60-60V60c0-33.08-26.92-60-60-60Zm20,452c0,11.03-8.97,20-20,20h-114v-163h61.79l10.21-62h-72v-43c0-16.98,13.02-30,30-30h41v-62h-41c-50.92,0-91.98,41.25-91.98,92.17v42.83h-60.02v62h60.02v163H60c-11.03,0-20-8.97-20-20V60c0-11.03,8.97-20,20-20H452c11.03,0,20,8.97,20,20V452Z"
  }));
}

const ForwardRef = React.forwardRef(FacebookIcon);
module.exports = ForwardRef;