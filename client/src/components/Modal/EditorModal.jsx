import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDesignType, setDesignId, setBlockOrder } from 'redux/selectBoxSlice';

import Table from 'components/Editor/Table';

import designType from 'data/designType';
import { ModalRenderBox } from 'components/Editor/ModalRenderBox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import 'styles/Editor/EditorModal.css';

const EditorModal = ({ block_id, design_type, design_id, setIsOpen }) => {
  const defaultType = design_type === 'default' ? 'image' : design_type;

  const [selectedDesignId, setSelectedDesignId] = useState(0);
  const [selectedDesignType, setSelectedDesignType] = useState(defaultType);
  const dispatch = useDispatch();

  const designSelectType = (type) => {
    setSelectedDesignType(type);
    setSelectedDesignId(0);
  };

  const designSelectId = (id) => {
    setSelectedDesignId(id);
  };

  const handleGetBlock = () => {
    if (selectedDesignId === 0) {
      alert('디자인을 선택해주세요.');
      return;
    }
    dispatch(setDesignType({ block_id, design_type: selectedDesignType }));
    dispatch(setDesignId({ block_id, design_id: selectedDesignId }));
    setIsOpen(false);
  }

  const renderBox = (box, index) => ModalRenderBox[selectedDesignType](box, index, designSelectId, selectedDesignId);

  return (
    <>
      <div className='editModal-container'>
        <div className='editModal-header'>
          <h3 className='font-style'>블록 디자인 추가</h3>
          <span style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className='editModal-main'>
          <div className='editModal-left font-style'>
            {designType.map((item) => (
              <p key={item.idx} className={selectedDesignType === item.type ? 'designSelect' : ''} onClick={() => designSelectType(item.type)}>
                {item.text}
              </p>
            ))}
            {selectedDesignId !== 0 && <button className='editMenu-select-btn' onClick={handleGetBlock}>가져오기</button>}
          </div>
          {selectedDesignType === 'table' ? (
            <div className='editModal_table'>
              <Table rows={6} cols={8} />
            </div>
          ) : (
            <div className='editModal-right' style={{ gridTemplateRows: `repeat(auto-fill, ${selectedDesignType === 'line' ? '96px' : '160px'})` }}>
              {designType.find((item) => item.type === selectedDesignType).boxes.map((box, index) => renderBox(box, index))}
            </div>
          )}
        </div>
      </div>
      <div className='editModal-overlay'></div>
    </>
  );
};

export default EditorModal;