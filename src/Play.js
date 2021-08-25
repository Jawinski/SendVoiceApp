import * as React from "react";

const Play = ({ styles = {}, ...props }) => (
    <svg height="32px" viewBox="0 0 32 32" width="32px" {...props}>
        <g fill="currentColor" fillRule="nonzero">
            <path
                d="M12.2,24.7L23.1,18c0.9-0.6,1.1-1.9,0.5-2.8c-0.1-0.2-0.3-0.3-0.4-0.4L12.2,7.4
	c-0.9-0.7-2.1-0.5-2.8,0.4C9.1,8.1,9,8.6,9,9v14.1c0,1.1,0.9,2,2,2C11.4,25.1,11.8,25,12.2,24.7z"
            />
        </g>
    </svg>
);

export default Play;
