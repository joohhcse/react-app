import logo from './logo.svg';
import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';
// import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
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

  getReadContent() {
    var i = 0 ;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // );

        //#1 : concat 사용 : 성능면에서 concat 사용하는게 유리
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // )

        //#2 : Array.from() 사용 : concat처럼 데이터 복사, 동작함 
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});

        this.setState({
          // contents: this.state.contents
          contents : _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);    //contents 복사한 새로운 배열이 만들어짐
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id , title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          
          this.setState({
            contents : _contents,
            mode: 'read'
          });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    console.log('render', this);  //자신을 가리킴 ㅇㅇ

    return _article;
  }

  render() {
    console.log('App render');

    return (
      <div className="App">
        <header className="App-header">
          <h1>React App!!</h1>
        </header>
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
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete') {
            if(window.confirm('ㄹㅇ?? 삭제??')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < this.state.contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              })

              alert('deleted!');
            }
          }
          else {
            this.setState({
              mode: _mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
