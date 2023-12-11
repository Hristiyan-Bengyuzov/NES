import { Dropdown, Menu, Button } from 'antd';
import React, { useState } from 'react';

const OptionsRight = () => {
  
  const menu = (
    <Menu>
      <Menu.Item key="1">Plain</Menu.Item>
      <Menu.Item key="2">Mint</Menu.Item>
      <Menu.Item key="3">Strawberry</Menu.Item>
    </Menu>
  );
  return (
    <div>
    <p>Window flavors:</p>
    <Dropdown overlay={menu}>
      <Button>
        Select an Option
      </Button>
    </Dropdown>
      <p>Anon:</p>
      <p>Quote preview:</p>
      <p>Image expand:</p>
      <p>Image preview:</p>
    </div>
  );

}

export default OptionsRight;