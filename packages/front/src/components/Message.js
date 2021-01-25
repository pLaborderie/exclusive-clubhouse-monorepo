import React from 'react'

function Message ({ message: { title, content, createdAt, author } }) {
  return (
    <div className="flex space-x-3">
      <div>
        <div className="text-sm">
          <p className="font-medium text-gray-900">
            {title}{author ? '- ' + author.firstName + ' ' + author.lastName : ''}
          </p>
        </div>
        <div className="mt-1 text-sm text-gray-700">
          <p>
            {content}
          </p>
        </div>
        <div className="mt-2 text-sm space-x-2">
          <span className="text-gray-500 font-medium">{createdAt}</span>
          <span className="text-gray-500 font-medium">&middot;</span>
          <button type="button" className="text-gray-900 font-medium">
            Delete button if admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;