import React, { memo } from 'react'

function Header() {

    return (
        <div className='header'>
            <div className='header_title'>Someone similar to you</div>
        </div>
    )
}

export default memo(Header);