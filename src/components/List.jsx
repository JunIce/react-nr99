import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default(props) => {
    const { data } = props
    return (<li className="card ">
        <div className="card-main">
            <div className="card-hd">
                <Link to={data.titleurl.split('.')[0]}>
                    <img src={data.titlepic} width="300" height="260" alt={data.title}/>
                </Link>
                <a className="btn-collect" id="collect-add" data-classid={data.classid} data-id={data.id}>
                    <span>加入收藏</span>
                </a>
                <a className="btn-love">
                    <i></i>
                </a>
            </div>
            <div className="card-bd">
                <div className="bd-quote">
                    <a>{data.title}</a>
                </div>
                <div className="bd-info">
                    <ul className="stats-list">
                        <li className="post z">{data.likenum}</li>
                        <li className="like y">{data.favanum}</li>
                    </ul>
                </div>
            </div>
        </div>
    </li>)
}
