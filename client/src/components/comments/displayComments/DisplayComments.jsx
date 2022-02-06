import React from "react";

export const DisplayComments = ({ comments }) => {
  console.log(comments);
  return (
    <>
      <div>
        {comments.map((comm) => {
          return (
            <div key={comm._id}>
              <strong>{comm.author}:</strong>
              {comm.comment}
            </div>
          );
        })}
      </div>
    </>
  );
};
