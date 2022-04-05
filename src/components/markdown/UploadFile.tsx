import React, { Fragment, useState } from 'react';

const UploadFile = () => {
  const [image, setImage] = useState(null);
  const [dataimage, setdataImage] = useState(null);
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setdataImage(event.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div>
        <input type="file" onChange={onImageChange} className="filetype" />
        <img src={image} alt="preview image" />
      </div>
    </Fragment>
  );
};

export default UploadFile;
