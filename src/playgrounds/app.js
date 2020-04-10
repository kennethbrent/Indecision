class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options:[]
        }
    }

    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json)
            if(options){
                this.setState(()=> ({options}))
            }
        } catch(e){
            //do nothing
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json =JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
      
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    handleDeleteOptions(){
        this.setState(()=> ({options: []}))
    }

    handleDeleteOption(optionToRemove){
        this.setState((prevState)=> ({
            options: prevState.options.filter((option)=>{
                return optionToRemove !== option
            })
        }))
    }

  
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        alert(option)
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add an item'
        } else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists.'
        } 
        this.setState((prevState)=> ({options: prevState.options.concat(option)}))
    }

    render(){
        const subtitle = 'Put your life in the hands of a computer'
        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                 options={this.state.options}
                 handleDeleteOptions={this.handleDeleteOptions} 
                 handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

const Header = (props) => {
        return(
            <div>
                <h1>{props.title}</h1>
                {props.subtitle && <h2>{props.subtitle}</h2>}
            </div>
        );
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
        return(
            <div>
                <button 
                    onClick={props.handlePick}
                    disabled={!props.hasOptions}
                >
                What should I do?
                </button>
            </div>
        );
}

const Options = (props) => {
        return(
            <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
                {props.options.length === 0 && <p>Please add an option to get started</p>}
                <ol>
                    {props.options.map((option, index)=> {
                        return(
                            <Option 
                                option={option} 
                                key={index} 
                                handleDeleteOption={props.handleDeleteOption}
                            />
                        );
                    })}
                </ol>
            </div>
        );
}

const Option = (props) => {
        return(
            <li>{props.option}
                <button onClick={(e)=>{
                    props.handleDeleteOption(props.option)
                }}>
                remove
                </button>
            </li>
        );
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }

    handleAddOption (e){
        e.preventDefault()
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)

        this.setState(()=> ({error}))
        if(!error) {
            e.target.elements.option.value = ''
        }
    }


    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('root'))

























///////playground

// console.log('app.js is running');
// const root = document.getElementById('root')
// //JSX - JavaScript XML

// const app = {
//     title: 'Indecision Application',
//     subtitle: 'Put your life in the hands of a computer',
//     options: []
// }

// const handleSubmit = (e) => {
//     e.preventDefault()
//     const option = e.target.elements.option.value;
//     if(option){
//         app.options.push(option);
//         e.target.elements.option.value = ''
//         renderApp()
//     }
// }

// const handleRemoveAll = () => {
//     app.options = []
//     renderApp()
// }

// const handleMakeDecision = () => {
//     const randomNum = Math.floor(Math.random() * app.options.length);
//     const option = app.options[randomNum];
//     alert(option)
// }


// const renderApp = () => {
//     const template = (
//         <div>
//             <h1>{app.title}</h1>
//             {app.subtitle && <p>{app.subtitle}</p>}
//             {app.options.length > 0 ?
//                 <div>
//                     <p>Here are your options</p>
//                     <button type="button" onClick={handleMakeDecision}>What should i do</button>
//                     <button type="button" onClick={handleRemoveAll}>Remove All</button>
//                 </div>
//                  :
//                  'No options yet - add one now'
//             }
//             <ol>
//             {
//              app.options.map((option, index)=>{
//                 return(
//                     <li key={index}>{option}</li>
//                 );
//              })
//             }
//             </ol>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="option"/>
//                 <button>Add option</button>
                
//             </form>
//         </div>
//     );
//     ReactDOM.render(template, root)
// }

// renderApp()