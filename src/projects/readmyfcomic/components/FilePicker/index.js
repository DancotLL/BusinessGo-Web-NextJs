import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { isImage } from '../../../../utils/files';
import usePushAlert from '../../../../shared/hooks/usePushAlert';
import { uploadFile } from '../../../../services/cloudinary/file';

import { getLanguage } from './lang';

const FilePicker = props => {
  const project = useSelector(store => store.project);
  const language = getLanguage(useSelector(store => store.language));
  const pushAlert = usePushAlert();
  const pickerRef = useRef();
  const [fileDragged, setFileDragged] = useState(false);
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);
  const projectRef = useRef();
  projectRef.current = project;

  const handlePickFile = () => {
    pickerRef.current.click();
  };

  const handleSetFile = files => {
    const [_file] = files;
    setFileDragged(false);

    if (uploading) return;

    if (files.length > 1)
      return pushAlert({
        type: 'error',
        title: language.invalidLength.title,
        message: language.invalidLength.message
      });

    if (!isImage(_file))
      return pushAlert({
        type: 'error',
        title: language.invalidFile.title,
        message: language.invalidFile.message
      });

    props.onUploadStart();
    setUploading(true);
    setFile(_file);
    uploadFile(projectRef.current, _file).then(({ data: upload }) => {
      setUploading(false);
      props.onUploadEnd(upload.secure_url);
    });
  };

  const handleDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = e => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    handleSetFile(files);
  };

  useEffect(() => {
    const handleChangeFile = e => {
      handleSetFile(e.target.files);
    };

    pickerRef.current.addEventListener('change', handleChangeFile);
    return () => {
      pickerRef.current?.removeEventListener('change', handleChangeFile);
    };
  }, []);

  return (
    <div className="filePicker">
      <h3>{props.title}</h3>
      <div
        className={`input${fileDragged ? ' fileDragged' : ''}`}
        onDragEnter={() => setFileDragged(true)}
        onDragLeave={() => setFileDragged(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={`fileButton${fileDragged ? ' fileDragged' : ''}`} onClick={handlePickFile}>
          {language.selectFile}
        </div>
        <div className="fileName">{file.name}</div>
        <i className="fa fa-trash" onClick={() => setFile({})} />
      </div>
      <input className="picker" type="file" ref={pickerRef} />
      <style jsx>
        {`
          .input {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 40px;
            border-style: solid;
            border-width: 1px;
            border-color: #b888be;
            background-color: #ffcfb5;
            border-radius: 7px;
            overflow: visible;
            transition: 0.7s;
          }
          .input.fileDragged {
            transform: scale(1.1);
            box-shadow: 0 0 2px 2px #b888be;
          }
          .fileButton {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: fit-content;
            height: 100%;
            background-color: #a79595;
            padding: 0 7px 0 7px;
            border-radius: 7px;
            cursor: pointer;
            user-select: none;
            transition: 0.7s;
          }
          .fileButton:hover {
            transform: scale(1.1);
          }
          .fileButton:active {
            transform: scale(1.2);
            transition: 0.1s;
          }
          .fileButton.fileDragged {
            transform: scale(1.1) translate(200%);
          }
          .picker {
            visibility: hidden;
          }
          .fileName {
            margin-left: 14px;
          }
          .fa-trash {
            margin-left: auto;
            margin-right: 14px;
            width: 24px;
            height: fit-content;
            padding: 4px;
            color: red;
            border-radius: 7px;
            cursor: pointer;
            user-select: none;
            transition: 0.7s;
          }
          .fa-trash:hover {
            transform: scale(1.1);
          }
          .fa-trash:active {
            transform: scale(1.2) rotate(5deg);
            transition: 0.1s;
          }
        `}
      </style>
    </div>
  );
};

FilePicker.propTypes = {
  title: PropTypes.string.isRequired,
  onUploadStart: PropTypes.func,
  onUploadEnd: PropTypes.func
};

FilePicker.defaultProps = {
  onUploadStart: () => {},
  onUploadEnd: () => {}
};

export default FilePicker;
