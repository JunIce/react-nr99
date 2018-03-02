import React, {Component} from 'react'
import {Route, NavLink} from 'react-router-dom'
import {api} from '../api'

import ListMain from './ListMain'
import Content from './Content'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: []
        }
    }
    componentDidMount() {
        fetch(api.siteMenu,{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                menu: data
            })
        })
        .catch(err => {
            //console.error(err)
        })
    }
    _renderNav(menu) {
        if(menu == undefined || menu.length == 0) return;
        let menuArr = [];

        menu.map((m,idx) => {
            menuArr.push(<li key={idx}><NavLink activeClassName="on" to={{pathname: '/show/'+ m.classpath, state: { classid: m.classid}}}>{m.classname}</NavLink></li>)
            menuArr.push(<li key={idx+'_pre'} className="pre">|</li>)
        })

        return menuArr
    }
    render() {
        const { menu } = this.state;

        return (
            <div>
            <div id="header" className="cl">
            <div className="headWrap wrap">
                <div className="logo z">
                    <a href="/">粘人网</a>
                </div>
                <div className="logo_sm z">
                    <p>服装配饰&nbsp;&nbsp;晒单分享</p>
                </div>
                <div className="searchBox z">
                    <form name="simpleSearch" action="/e/search/index.php" method="post">
                        <input type="hidden" name="classid" value="0"/>
                        <input type="hidden" name="show" value="title,appraise"/>
                        <div className="searchInput z"><input type="text" name="keyboard" value=""/></div>
                        <div className="searchSubmit y"><input type="submit" name="submit" value="搜索"/></div>
                    </form>
                </div>

                <div className="headRight">

                    <div className="noLogin">
                        <a href="javascript:;" className="regLink y">注册</a>
                        <div className="preLine y"></div>
                        <a href="javascript:;" className="loginLink y">登录</a>
                    </div>
                </div>

            </div>
            <div id="column_list">
                <div className="column_list wrap cl">
                    <ul>
                        <li><NavLink to="/" exact activeClassName="on">首页</NavLink></li>
                        <li className="pre">|</li>
                        {
                            this._renderNav(menu)
                        }
                        <li className="last">
                            <a href="/e/tool/feedback/?bid=1">问题反馈</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Route path="/" exact component={ListMain}/>
        <Route path="/show/:classname" component={ListMain}/>
        <Route path="/:classname/:classid/:id" component={Content}/>
    </div>
    )
    }
}
