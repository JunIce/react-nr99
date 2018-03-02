import React, { Component } from 'react'
import {api} from '../api'

export default class Content extends Component {
    constructor(props){
        super(props)
        this.state = {
            detail: {}
        }
    }

    componentDidMount(){
        let {classid, id} = this.props.match.params;
        let url = api.infoDetail + '/' + classid + '/' + id;
          fetch(url,{
              method: 'GET',
          })
          .then(res => res.json())
          .then(data => {
              this.setState({
                  detail: data[0]
              })
          })
          .catch(err => {
              console.error(err)
          })
    }

    getImgs(imgs) {
        if(imgs == undefined) return [];
        let igs = imgs.split('###');
        igs.map(m => {
            if(m == '' || null) return;
            m = m.replace('300x260', '600x600')
        })
        return igs
    }

    _renderTags(tags) {
        let TagComp = [];
        if(tags== undefined || tags.length == 0) return;
        tags.map((tag,idx) => {
            TagComp.push(<a key={idx} href={tag.tagid}>{tag.tagname}</a>)
        })

        return TagComp
    }
    render() {
        const {detail} = this.state
        return(
            <div id="goodsMain" className="wrap goodsContent cl">
              <div className="goodsContLeft z">
                <div className="goodborder">
                  <div className="goodsInfoPart">
                    <div className="goodstitleLike cl">
                      <span className="location y">当前位置：
                          <a href="/">首页</a> &gt; <a href="/show/nanzhuang/">男装</a> &gt;</span>
                      <span className="sharer z">
                          <a href="/member/620" target="_blank"><img src={detail.userpic} width="36" height="36" alt="" />{detail.username}</a>于分享</span>
                    </div>
                    <div className="mainIntro">
                      <div className="main_pinglun" dangerouslySetInnerHTML={{__html: detail.appraise}}></div>
                      <div className="main_picture">
                          {
                              this.getImgs(detail.comm_imgs).map((m,idx) => {
                                  if(m == '') return;
                                  return(
                                      <p key={idx}>
                                         <img src={m} alt={detail.title}/>
                                      </p>
                                  )
                              })
                          }
                      </div>
                      <div className="bsh_dpqq"><img src="http://www.nr99.com/assets/images/bsh_erwn.png" /></div>
                      <div className="price_place cl"><span className="price_1 z">价格：7800人民币</span><span className="place_1 y">购买处：
                <span title="Louis Vuitton">Louis Vuitton</span></span>
                      </div>
                      <div className="main_tags"><img src="http://www.nr99.com/assets/images/biaoqian.png" />
                        {
                            this._renderTags(detail.tags)
                        }
                      </div>
                    </div>
                  </div>
                  <div className="main_count">
                    <span className="main_like" >喜欢<i className="count">{detail.likenum}</i></span>
                    <span className="main_collect" id="collect-add_1" data-classid="2" data-id="7790">
                        <span>收藏</span>
                        <i className="count">{detail.favanum}</i>
                    </span>
                  </div>
                  <div className="commodity-response">
                    <ul className="ul-tabbar">
                      <li className="ul-tab">回应</li>
                    </ul>
                    <div className="ul-contents">
                      <div className="ul-content">
                        <div className="cont_pls" data-classid="2" data-id="7790">
                          <p className="no-story-post">还没有关于这个东西的评论...</p>
                        </div>

                        <div className="story-editor cl">
                            <span className="postitem-avatar">
                				<img src="/assets/images/member_36x36.gif" alt="" />
                			</span>
                          <div className="no-login-pl">
                            <div className="pl_tip_login">
                              您还没登录，请<a href="javascript:;" >登录</a>或<a href="javascript:;" >注册</a>后再来评论！
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="goodsContRight y">
                <div className="userInfo">
                  <div className="avatar"><a href="/member/620"><img src={detail.userpic} width="80" height="80" alt={detail.username} /></a></div>
                  <div className="contUsername"><a href="/member/620"></a></div>
                  <div className="fans"><a href="javascript:;" data-uid="620" >关注TA</a></div>
                </div>
                <div className="favaUserlist">
                  <h4>TA们也收藏了此商品</h4>
                  <ul className="cl">
                  </ul>
                </div>
              </div>
            </div>
        )
    }
}
