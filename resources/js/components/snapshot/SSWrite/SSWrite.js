import React from 'react';
import { Icon, Button } from 'react-materialize';

const handleHeight = (e) => {
  e.target.style.height = '1rem';
  e.target.style.height = (e.target.scrollHeight)+"px";
}

const SSWrite = ({
  addImage,
  handleChange,
  body,
  preview
}) => (
  <div className="snapshot-write">
    <div className="write-head">
      <Button>업로드</Button>
    </div>
    <div className="write-body">
      <img src={preview}/>
      <textarea
        rows={1}
        onKeyDown={handleHeight}
        onKeyUp={handleHeight}
        value={body}
        onChange={handleChange}
      />
      <div className="image-wrapper"></div>
    </div>
    <div className="write-options">
      <div className="btns">
        <label htmlFor="img"><Icon>add_a_photo</Icon></label>
        <input onChange={addImage} id="img" type="file" accept="image/*;capture=camera" style={{display: 'none'}}></input>
        <Icon>person_add</Icon>
        <Icon>local_offer</Icon>
      </div>
      <div className="length">
        <span>{body.length}/150</span>
      </div>
    </div>
  </div>
);

export default SSWrite;