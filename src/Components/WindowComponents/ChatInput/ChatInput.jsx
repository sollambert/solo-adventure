import './ChatInput.css'

function ChatInput({ value, setValue, send }) {

    const handleInputBuffer = (event) => {
        setValue(event.target.value);
    }

    const handleKeyDown = (event) => {
        // console.log(event.key);
        if (event.key == "Enter") {
            send(value, clearInput);
        }
    }

    const clearInput = () => {
        setValue('');
    }

    return (<>
        <label htmlFor="input"></label>
        <input
            onKeyDown={handleKeyDown}
            onChange={handleInputBuffer}
            name="input"
            type="text"
            value={value}
            placeholder="Enter commands here..."
        />
    </>)
}

export default ChatInput;