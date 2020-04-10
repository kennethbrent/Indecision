import React from 'react'
import Option from './Option'
const Options = (props) => {
    return(
        <div>
            <div className="widget-header">
                <h3>Your options</h3>
                <button
                className="button button--link"
                onClick={props.handleDeleteOptions}
                >Remove All
                </button>
            </div>
            {props.options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
            <ol>
                {props.options.map((option, index)=> {
                    return(
                        <Option 
                            option={option} 
                            key={index} 
                            handleDeleteOption={props.handleDeleteOption}
                            count={index + 1}
                        />
                    );
                })}
            </ol>
        </div>
    );
}

export default Options