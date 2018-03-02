import React,{ Component } from 'react'

import List from './List'
import { api } from '../api'


export default class ListMain extends Component {
    constructor(props){
        super(props)

        this.state = {
            page: 1,
            cont: [ ],
            pageBol: false
        }
    }

    componentDidMount() {
        const { location } = this.props;
        this.fetchData(location)
        window.addEventListener('scroll', this._onscroll.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.setState({
                cont: [],
                page: 1
            })
        }
        this.fetchData(nextProps.location);
    }

    fetchData(location) {
        let state = location.state
        let url = state == undefined ? api.homeNewInfo : api.classInfo + '/' + state.classid;

        url += '?page='+ this.page +'&page_size=15';

        fetch(url ,{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                cont: this.state.cont.concat(data)
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    _onscroll() {
        console.log(this.state.pageBol)
        let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
        let winHeight =  document.body.offsetHeight;
        let innerHeight = window.innerHeight;
        if(parseInt(winHeight - scrollTop - innerHeight) < 350) {

            !this.state.pageBol && this.setState({page: ++this.state.page, pageBol: true})

            console.log(this.state.page)

        }else{
            this.setState({pageBol: false})
        }
    }

    render() {
        const { cont } = this.state
        return(
            <div className="wrap contMain cl">
                <div className="mainList z">
                    <ul className="main-card cl" >
                        {
                            cont.map((c,idx) => {
                                return(
                                    <List key={idx} data={c}/>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    }
}
