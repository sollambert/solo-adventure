import './ChatHistory.css'

function ChatHistory({ messages, historyEndRef }) {

    return (
        <div className="history">
            {messages.map((message) => {
                return <p key={message.id} >{message.message}</p>
            })}
            <div ref={historyEndRef} />
        </div>
    );
}

export default ChatHistory;