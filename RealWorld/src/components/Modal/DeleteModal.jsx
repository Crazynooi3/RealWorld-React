import ReactDOM from "react-dom";

export default function DeleteModal({ isOpen, onClose }) {
  console.log(isOpen, onClose);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Warning !!!</h5>
            {/* <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <div className="modal-body">
            <p>Are you sure about DELETE this article ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
