import * as React from "react";

const Pause = ({ styles = {}, ...props }) => (
    <svg height="32px" viewBox="0 0 32 32" width="32px" {...props}>
        <g fill="currentColor" fillRule="nonzero">
            <path
                fill="currentColor"
                d="M13,7 C14.1045695,7 15,7.8954305 15,9 L15,23 C15,24.1045695 14.1045695,25 13,25 L11,25 C9.8954305,25 9,24.1045695 9,23 L9,9 C9,7.8954305 9.8954305,7 11,7 L13,7 Z M21,7 C22.1045695,7 23,7.8954305 23,9 L23,23 C23,24.1045695 22.1045695,25 21,25 L19,25 C17.8954305,25 17,24.1045695 17,23 L17,9 C17,7.8954305 17.8954305,7 19,7 L21,7 Z"
            />
        </g>
    </svg>
);

export default Pause;
