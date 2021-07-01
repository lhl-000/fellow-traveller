import React, { useState } from 'react';
import { List, InputItem, ImagePicker, Toast } from 'antd-mobile';


export default function User(props) {

    const { getFieldProps } = props.form;
    const { files, setFiles}  = props.data;
    
    const handleChange = (files) => {
      if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
          Toast.fail('Picture size should less than 0.5M');
          return;
      }
      setFiles(files);
  };

    return (
        <div className='user'>
          <List
            renderHeader={() => 'Head portrait'}
            >
            <List.Item>
                  <ImagePicker
                      files={files}
                      selectable={files.length < 1}
                      onChange={handleChange}
                  />
              </List.Item>
          </List>
            <List
            renderHeader={() => 'User register'}
          >
            <InputItem
              {...getFieldProps('username', {
                rules: [{ required: true }]
              })}
              placeholder='username'
            >
              Username：
            </InputItem>
            <InputItem
              {...getFieldProps('password', {
                rules: [{ required: true }]
              })}
              placeholder='must be larger than 8 dights'
            >
              Password：
            </InputItem>
            <InputItem
              {...getFieldProps('cfmPassword', {
                rules: [{ required: true }]
              })}
              placeholder='confirmed password'
            >
            Confirmed:
            </InputItem>
          </List>
        </div>
    )
}

