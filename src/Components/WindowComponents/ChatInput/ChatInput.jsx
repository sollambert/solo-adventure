import './ChatInput.css'

function ChatInput( {value, setValue }) {

    const handleInputBuffer = (event) =>{
        setValue(event.target.value);
    }

    return (<>
        <label htmlFor="input"></label>
        <input onChange={handleInputBuffer}name="input" type="text" value={value}/>
    </>)
}

export default ChatInput;