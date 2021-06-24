import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { editUserAsync } from '@/redux/actions/user';
import { useDispatch } from 'react-redux';

function Edit(props) {

    const [files, setFiles] = useState([]);
    const { getFieldProps, validateFields } = props.form;

    const dispatch = useDispatch();

    const handleChange = (files) => {
        if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
            Toast.fail('Picture size should less than 0.5M');
            return;
        }
        setFiles(files);
    };

    const handleSubmit = () => {
        if (!files.length) {
            Toast.fail('Please upload file');
            return;
        }
        validateFields((error, value) => {
            if (error) {
                Toast.fail('Please complete message');
                return;
            } else {
                dispatch(editUserAsync({
                    avater: files[0].url,
                    meg: value.meg
                }, props.history));
            }
        });
    };

    return (
        <div className='user-edit'>
            <List>
                <List.Item>
                    <ImagePicker
                        files={files}
                        selectable={files.length < 1}
                        onChange={handleChange}
                    />
                </List.Item>
                <List.Item>
                    <InputItem
                        {...getFieldProps('meg', {
                            rules: [{ required: true }],
                            initialValue: 'leave a message'
                        })}
                        placeholder='leave a message'
                    >
                        message：
                    </InputItem>
                </List.Item>
            </List>
            <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>修改</Button>
        </div>
    )
}

export default createForm()(Edit);