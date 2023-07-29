import React, { useState, useEffect } from 'react';
import 'styles/Editor/Table.css';

const TableCell = ({ onClick, onMouseEnter, row, col, tableRange, previewRange, clicked, onReleaseClick }) => {
  const [color, setColor] = useState('white');
  const [borderColor, setBorderColor] = useState('black');
  const [borderStyle, setBorderStyle] = useState('dashed');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (clicked) {
      if (row <= tableRange[0] && col <= tableRange[1]) {
        setColor('#FFEBD6');
        setBorderColor('#EE7D00');
        setBorderStyle('solid');
      } else {
        setColor('white');
      }
    } else if (row <= previewRange[0] && col <= previewRange[1]) {
      setColor('#FFEBD6');
      setBorderColor('#EE7D00');
      setBorderStyle('solid');
    } else {
      setColor('white');
      setBorderColor('black');
      setBorderStyle('dashed');
    }
  }, [tableRange, previewRange, clicked]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log('버튼 클릭');
    onReleaseClick();
  };

  return (
    <td
      style={{ backgroundColor: color, borderColor: borderColor, borderStyle: borderStyle, cursor: 'pointer', verticalAlign: 'middle', textAlign: 'center' }}
      onClick={() => {
        onClick();
        if (clicked) {
          setShowButton(true);
        }
      }}
      onMouseLeave={() => {
        if (clicked) {
          setShowButton(false);
        }
      }}
      onMouseEnter={onMouseEnter}
    >
      {showButton && <button style={{ border: '1px solid #EE7D00', padding: '5px', fontSize: '15px', borderRadius: '50%', backgroundColor: '#EE7D00', color: '#f3f3f3' }}>해제</button>}
    </td>
  );
};

const Table = ({ rows, cols }) => {
  const [tableRange, setTableRange] = useState([0, 0]);
  const [previewRange, setPreviewRange] = useState([0, 0]);
  const [clicked, setClicked] = useState(false);

  const onCellMouseEnter = (i, j) => {
    setPreviewRange([i, j]);
    setClicked(false);
  };

  const onCellClick = (i, j) => {
    console.log(`Row: ${i}, Col: ${j}`);
    setTableRange([i, j]);
    setClicked(true);
  };

  const handleTableLeave = () => {
    setTableRange([0, 0]);
    setPreviewRange([0, 0]);
  };
  const handleReleaseClick = () => {
    setClicked(false);
    setTableRange([0, 0]);
  };
  return (
    <div className='table_wrap'>
      <p>
        {previewRange[0] + 1} X {previewRange[1] + 1} 표
      </p>
      <table onMouseLeave={handleTableLeave}>
        <tbody>
          {Array(rows)
            .fill()
            .map((_, i) => (
              <tr key={i}>
                {Array(cols)
                  .fill()
                  .map((_, j) => (
                    <TableCell
                      key={j}
                      onClick={() => onCellClick(i, j)}
                      row={i}
                      col={j}
                      onMouseEnter={() => onCellMouseEnter(i, j)}
                      tableRange={tableRange}
                      previewRange={previewRange}
                      clicked={clicked}
                      onReleaseClick={handleReleaseClick}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;