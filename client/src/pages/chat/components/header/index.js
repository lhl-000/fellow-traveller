import React from 'react'
import { Tabs, Badge } from 'antd-mobile';
import { BsFillPersonLinesFill } from "react-icons/bs";
export default function Header(props) {

    const tabs = [
        { title: <Badge text={''}>< BsFillPersonLinesFill/></Badge> },
      ];
      
    return (
        <div>
            <Tabs tabs={tabs} 
            tabBarPosition='top'
            initialPage={0}
            >{props.children}</Tabs>
        </div>
    )
}