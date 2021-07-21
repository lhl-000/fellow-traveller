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
                props.sesionList.map((item) => {
                    const payload = JSON.parse(item.meta.payload);
                    return (
                    <Item
                        arrow="horizontal"
                        thumb={defaultAvatar}
                        multipleLine
                        onClick={handleClick.bind(this, payload.from === user? payload.to : payload.from)}
                        key={item.channel_id}
                        >
                        {payload.from === user? payload.to : payload.from}
                         <Brief>
                         last time: {timer(item.meta?.timestamp)}
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         {item.unread_num === 0? 0 : <span className='unread'>{item.unread_num}</span>}
                         
                         &nbsp; unread
                         </Brief>
                    </Item>
                    )
                }
                )
            }
                {/* <Item
                    arrow="horizontal"
                    thumb={defaultAvatar}
                    multipleLine
                    onClick={() => {}}
                >
                Title <Brief>subtitle</Brief>
                </Item> */}
            </List>
        </div>
    )
}
