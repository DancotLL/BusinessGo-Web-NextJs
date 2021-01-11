import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, PopoverTitle } from 'react-bootstrap';
import PropTypes from 'prop-types';

import FieldRenderer from '../../../../../../../../../FieldRenderer';

import { getLanguage } from './lang';

const EditModal = props => {
  const { clientModel, clientDocument } = props;
  const [newClientDocument, setNewClientDocument] = useState(clientDocument);
  const language = getLanguage(useSelector(store => store.language));

  const { fields } = clientModel;

  return (
    <div>
      <Modal show backdrop="static" onHide={props.onClose}>
        <Modal.Header closeButton>
          <PopoverTitle>
            {language[props.action]}
            &nbsp;
            {clientModel.name}
          </PopoverTitle>
        </Modal.Header>
        <Modal.Body>
          <FieldRenderer fields={fields} data={clientDocument} onChange={setNewClientDocument} />
        </Modal.Body>
        <Modal.Footer>
          <div className="iconContainer saveIconContainer" onClick={() => props.onEdit(newClientDocument)}>
            <img className="icon" src="/shared/icons/accept.svg" alt="saveIcon" />
          </div>
          <div className="iconContainer deleteIconContainer" onClick={props.onClose}>
            <img className="icon" src="/shared/icons/close.svg" alt="closeIcon" />
          </div>
        </Modal.Footer>
      </Modal>
      <style jsx>
        {`
          .iconContainer {
            float: right;
            width: 40px;
            height: 25px;
            margin: 0 10px 10px 0;
            border-radius: 5px;
            transition: 0.2s;
          }
          .iconContainer:hover {
            cursor: pointer;
          }
          .deleteIconContainer {
            background-color: red;
          }
          .deleteIconContainer:hover {
            background-color: rgb(212, 38, 38);
            box-shadow: 0 0 1px 1px red;
          }
          .saveIconContainer {
            background-color: green;
          }
          .saveIconContainer:hover {
            background-color: green;
            background-color: rgb(23, 116, 23);
            box-shadow: 0 0 1px 1px green;
          }
          .icon {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

EditModal.propTypes = {
  clientModel: PropTypes.object.isRequired,
  clientDocument: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  action: PropTypes.string.isRequired
};

EditModal.defaultProps = {
  onClose: () => {},
  onEdit: () => {}
};

export default EditModal;
