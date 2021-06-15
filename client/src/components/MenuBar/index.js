import React, { Component } from 'react'
import { TabBar }  from 'antd-mobile';
import { BsHouseDoorFill, BsHouseDoor, BsFillChatDotsFill, BsChatDots, BsSearch, BsPersonLinesFill, BsPerson } from 'react-icons/bs'
import PropsTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import './index.scss';

class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    title: 'home',
                    selectedIcon: <BsHouseDoorFill style={{fontSize: '1.5rem'}} />,
                    icon: <BsHouseDoor  style={{fontSize: '1.5rem'}} />,
                    link: '/'
                },
                {
                    title: 'find',
                    selectedIcon: <BsSearch style={{fontSize: '1.5rem'}} />,
                    icon: <BsSearch  style={{fontSize: '1.5rem'}} />,
                    link: '/find'
                },
                {
                    title: 'chat',
                    selectedIcon: < BsFillChatDotsFill style={{fontSize: '1.5rem'}} />,
                    icon: <BsChatDots  style={{fontSize: '1.5rem'}} />,
                    link: '/chat'
                },
                {
                    title: 'my',
                    selectedIcon: <BsPersonLinesFill style={{fontSize: '1.5rem'}} />,
                    icon: <BsPerson style={{fontSize: '1.5rem'}} />,
                    link: '/user'
                },
            ]

            }
        
    }

    render() {
        const { show, pathname,history } = this.props;
        return (
            <div className='menu-bar'>
                <TabBar hidden={!show}>
                    {this.state.items.map(item => (
                        <TabBar.Item  
                            key={item.link}
                            title={item.title}
                            icon={item.icon}
                            selectedIcon={item.selectedIcon}
                            selected={pathname === item.link}
                            onPress={() => {
                               history.push(item.link);
                            }}
                         />
                    ))}
                    
                </TabBar>
            </div>
        )
    }
}

MenuBar.defaultProps = {
    show : false,
    pathname: ''
};

MenuBar.propsType = {
    show: PropsTypes.bool,
    pathname: PropsTypes.string
}

export default withRouter(MenuBar);