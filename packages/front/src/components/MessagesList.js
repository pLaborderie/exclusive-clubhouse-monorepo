import React from "react";
import Message from "./Message";

function MessagesList({ messages }) {
  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Messages
            </h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul className="space-y-8">
              {messages.map(message => (
                <li key={message.id}>
                  <Message message={message} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesList;
