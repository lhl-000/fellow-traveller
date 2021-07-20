import React from 'react'
import { List } from 'antd-mobile';
import { timer } from '@/utils';
import { useHistory } from 'react-router-dom';

export default function Lists(props) {
    const Item = List.Item;
    const Brief = Item.Brief;
    const defaultAvatar = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/Image1.png'
    const {sesionList, user} = props
    const history = useHistory();

    const handleClick = (value) => {
        history.push({
            pathname: '/chat/private',
            search: '?name='+ value,
        })
    }
    return (
        <div>
            <List renderHeader={() => 'Message'} className="chat-list">               
            {
                sesionList.map((item) => {
                    <Item
                        arrow="horizontal"
                        thumb={defaultAvatar}
                        multipleLine
                        onClick={handleClick(item.meta?.from === user? item.meta?.to : item.meta?.from)}
                        key={item.channel_id}
                        >
                        {item.meta?.from === user? item.meta?.to : item.meta?.from}
                         <Brief>last time: {timer(item.meta?.timestamp)}
                         &nbsq;&nbsq;&nbsq;&nbsq;&nbsq;
                         <span className='unread'>{item.unread_num}</span>
                         unread
                         </Brief>
                         <div>123</div>
                    </Item>
                }
                )
            }
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
