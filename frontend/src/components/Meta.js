import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title : '문방구에 오신것을 환영합니다',
    description : '디자이너의 굳즈 판매점',
    keywords : '학용품, 장난감, 온라인 스티커 '
}

export default Meta
