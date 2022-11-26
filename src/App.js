import { useState } from "react";
import "./App.css";
import { data } from "./data";
import ModalDelete from "./components/ModalDelete";
import CommentFilled from "./components/CommentFilled";
import CommentForm from "./components/CommentForm";
import Attribution from "./components/Attribution";

function App() {
  const [commentsData, setCommentsData] = useState(data);
  const [textareaValue, setTextareaValue] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  return (
    <div className="container">
      {showModalDelete && (
        <ModalDelete
          setShowModalDelete={setShowModalDelete}
          deleteID={deleteID}
          setCommentsData={setCommentsData}
        />
      )}
      {commentsData.comments.map((comment, index) => {
        return (
          <CommentFilled
            id={comment.id}
            key={comment.id}
            index={index}
            score={comment.score}
            userImg={comment.user.image.png}
            username={comment.user.username}
            date={comment.createdAt}
            replyingTo={comment.replyingTo}
            text={comment.content}
            setShowModalDelete={setShowModalDelete}
            setDeleteID={setDeleteID}
            setCommentsData={setCommentsData}
            commentsData={commentsData}
          />
        );
      })}
      <CommentForm
        placeholder={"Add a comment..."}
        btnValue="send"
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
        setCommentsData={setCommentsData}
      />
      <Attribution />
    </div>
  );
}

export default App;
