import React from "react";

interface CustomStyle extends React.CSSProperties {
    "--value": number;
  }
const Result: React.FC = () => {

    return(
        <div>
            <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": 70 } as CustomStyle}>70%</div>
        </div>
    )
}

export default Result