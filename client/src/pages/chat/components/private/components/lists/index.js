import React from 'react'
import {List} from 'antd-mobile';

export default function Lists() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const defaultAvatar = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/Image1.png'
    
    return (
        <div>
            <List renderHeader={() => 'Message'} className="chat-list">
                <Item
                    arrow="horizontal"
                    thumb={defaultAvatar}
                    multipleLine
                    onClick={() => {}}
                >
                Title <Brief>subtitle</Brief>
                </Item>
            </List>
        </div>
    )
}
