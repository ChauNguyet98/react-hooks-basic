import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './_color-box.scss';

ColorBox.propTypes = {};

const getRandomColor = () => {
  const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex];
};

function ColorBox(props) {
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('color_box') || 'deeppink';
    return initColor;
  });

  const handleClick = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    localStorage.setItem('color_box', newColor);
  };

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    ></div>
  );
}

export default ColorBox;
