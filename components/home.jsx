import React, { PropTypes } from 'react'
import _ from 'lodash'

const Nav = React.createClass({
  render() {
    let content;
    if(this.props.nav && this.props.nav[0] !== "" && this.props.nav.length > 0) {
      content = (
        <li className="arrow-unfold" className="arrow-fold" data-target={'#'+this.props.id}>
          <a className="li-link" data-value={this.props.images} data-toggle="collapse" data-target={'#'+this.props.id} >{this.props.name}</a>
          <ul id={this.props.id} className="collapse nav nav-list">
            {
              _.map(this.props.nav, (v,k) => {
                return(
                  <Nav key={this.props.id+'-'+k} data-target={this.props.id+'-'+k} id={this.props.id+'-'+k} {...v} />
                );
              })
            }
          </ul>
        </li>
      )
    } else {
      content = (
        <li>
          <a className="li-link" data-value={this.props.images} >{this.props.name}</a>
        </li>
      )
    }

    return(content);
  }
});

const Menu = React.createClass({
  render() {
    return(
      <div id="my-siderbar" className="col-sm-3 col-md-2 sidebar collapse in">
        <ul id="accordion" className="nav nav-list panel-group ">
          {
            _.map(this.state.conf, (v,k) => {
              console.log(JSON.stringify(v))
              return(
                <Nav key={'value-'+k} data-target={'value-'+k} id={'value-'+k} {...v} />
              );
            })
          }
        </ul>
      </div>
    );
  },

  getDefaultProps(){
    return {
      conf:[] // 用此索引找到数据请求地址
    }
  },

  getInitialState() {
    return {
      conf:[]
    }
  },

  componentDidMount() {
    // 请求配置数据
    fetch('//'+window.location.host+'/api/list')
      .then(res => {return res.json()})
      .then(j=>{
        if(j.success) {
          /* 针对每个类型只取name和id字段 */
          this.setState({conf:j.data})
        }
      })
  }

});

//data-uk-lightbox="{group:'my-group'}" data-lightbox-type='image'
const ImageList = React.createClass({
  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div className=" center-block text-center">
          <ul className="photoAlbum">
            {
              this.props.data[0] !== "" && _.map(this.props.data, (v,k)=> {
                return(
                    <li key={v} className="photoItem">
                      <a className="thumbnail" data-uk-lightbox="{group:'my-group'}" data-lightbox-type='image' href={v} >
                        <img src={v+'.tub'}/>
                      </a>
                    </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});

const Home = React.createClass({
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className='J_FilterCtrl'>
            <Menu />
          </div>
          <ImageList data={this.state.listImage} />
        </div>
      </div>
    )
  },

  getDefaultProps(){
    return {
      listImage:[] // 用此索引找到数据请求地址
    }
  },

  getInitialState() {
    return {
      listImage:[]
    }
  },

  componentDidMount() {

    $('.J_FilterCtrl').on('click','.li-link',(evt)=>{
      let images = $(evt.currentTarget).attr('data-value').split(',')
      console.log(images)
      this.setState({listImage:images})
    })

    $('#accordion ul.collapse').on('shown.bs.collapse', function() {
      $(this).hasClass("in") && $(this).parent().addClass("arrow-unfold");
    })
    $('#accordion ul.collapse').on('hidden.bs.collapse', function() {
      $(this).hasClass("in") || $(this).parent().removeClass("arrow-unfold");
    })

    $('#accordion').on("click", "li", function() {
      $(this).siblings().removeClass("active");
      $(this).siblings().find("li").removeClass("active");
      $(this).addClass("active");
      $(this).parentsUntil("#accordion").filter("li").addClass("active");
    });
  }
})

export { Home }
