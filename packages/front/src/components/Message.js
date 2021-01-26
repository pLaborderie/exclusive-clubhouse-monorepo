import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { UserContext } from '../stores/UserStore';

function Message ({ message: { title, content, createdAt, author } }) {
  const { user } = useContext(UserContext);
  const isMember = user && user.membership;
  const canViewAuthor = isMember && author;
  return (
    <div className="flex space-x-3">
      <div>
        <div className="text-sm">
          <p className="font-medium text-gray-900">
            {title}{canViewAuthor ? '- ' + author.firstName + ' ' + author.lastName : ''}
          </p>
        </div>
        <div className="mt-1 text-sm text-gray-700">
          <p>
            {content}
          </p>
        </div>
        <div className="mt-2 text-sm space-x-2">
          <span className="text-gray-500 font-medium">{isMember && createdAt}</span>
          {user && user.admin && (
            <>
              <span className="text-gray-500 font-medium">&middot;</span>
              <button type="button" className="text-gray-900 font-medium">
                Delete button if admin
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(Message);