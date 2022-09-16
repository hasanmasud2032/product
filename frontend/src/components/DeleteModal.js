import React from "react";
import Button from "./Button";

export default function DeleteModal({closeModal, requestedResponse}) {
  
   return  (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
           <h4>Delete</h4>
           <span className="close" onClick={() => closeModal(false)}>&times;</span>
        </div>
        <div className="pb">Do You want to Delete this Product?</div>
        <div className="flex">
            <Button type="button" onClick={() => closeModal(false)}>
            N0
            </Button>

            <Button onClick={requestedResponse} style={{ background:'red' }}>
            Yes
            </Button>
        </div>
      </div>
    </div>
   )
  }
  