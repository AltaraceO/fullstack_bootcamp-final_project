import React from "react";

export const DisplayComments = ({ comments }) => {
  return (
    <>
      <>
        {comments.map((comm) => {
          return (
            <div key={comm._id}>
              <strong>{comm.author}:</strong>
              {comm.comment}
            </div>
          );
        })}
      </>
    </>
  );
};
