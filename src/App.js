import logo from './logo.svg';
import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';
// import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'read',
      selected_content_id : 1,
      subject:{title:'Subject -title', sub:'World Wide Web! - sub'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    console.log('render', this);  //자신을 가리킴 ㅇㅇ

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage = { function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href="/"onClick={function(e){
              console.log(e);
              e.preventDefault(); //페이지가 전환되지 않음 //기본적 동작을 막음 (a태그)
              this.state.mode = 'welcome' //이벤트 호출 함수 안에서 this는 아무값도 없음 
              // bind.(this)로 적용 // 컴포넌트 자체를 가리키는 객체를 이 함수 안으로 주입
              
              //this.setState 사용해서 객체의 형태로 state변경
              this.setState({
                mode: 'welcome'
              })
            }.bind(this)}>{ this.state.subject.title }</a></h1>
          { this.state.subject.sub }
        </header> */}
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}>
        </TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
