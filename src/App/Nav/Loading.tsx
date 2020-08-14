import React from 'react';

const Loading = () => {
    return (
            <svg
            id="loading"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 323 323"
            >
                <rect width="323" height="323" style={{fill: "none"}} />
                <path
                    d="M160.32,83.31a77.78,77.78,0,1,1-74,81.37q-.11-2.2-.09-4.38"
                    style={{fill: "none", stroke:"currentColor", strokeMiterlimit:10, strokeWidth: "6px"}}
                />
                <line
                    x1="85.83"
                    y1="160.85"
                    x2="72.17"
                    y2="176.15"
                    style={{fill: "none", stroke:"currentColor", strokeMiterlimit:10, strokeWidth: "6px"}}
                />
                <line
                    x1="99.85"
                    y1="177.29"
                    x2="86.96"
                    y2="161.32"
                    style={{fill: "none", stroke:"currentColor", strokeMiterlimit:10, strokeWidth: "6px"}}
                />
                <polygon
                    points="86 160 88.5 163.22 91 166.43 86 166.43 81 166.43 83.5 163.22 86 160"
                    style={{fill: "none", stroke: "currentColor", strokeMiterlimit:10, strokeWidth: "6px"}}
                />
            </svg>
    )
}

export default Loading;