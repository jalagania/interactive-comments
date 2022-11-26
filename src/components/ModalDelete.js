import "./ModalDelete.css";

function ModalDelete(props) {
  function handleYesDelete(id) {
    props.setShowModalDelete(false);
    props.setCommentsData((prevState) => {
      return {
        ...prevState,
        comments: prevState.comments.filter((comment) => comment.id !== id),
      };
    });
  }

  return (
    <div className="modal-delete">
      <div className="modal-container">
        <p className="modal-title">Delete comment</p>
        <p className="modal-text">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal-buttons">
          <button
            className="btn btn-cancel"
            onClick={() => props.setShowModalDelete(false)}
          >
            No, Cancel
          </button>
          <button
            className="btn btn-delete"
            onClick={() => handleYesDelete(props.deleteID)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
      <div
        className="modal-bg"
        onClick={() => props.setShowModalDelete(false)}
      ></div>
    </div>
  );
}

export default ModalDelete;
