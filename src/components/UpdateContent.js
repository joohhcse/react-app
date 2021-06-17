import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this)  //이렇게 constructor에서 선언해주고 사용하면 bind(this) 안붙여도 됨
    }

    inputFormHandler(e) {
      this.setState({[e.target.name]:e.target.value});
    }

    render() {
    console.log('UpdateContent render');
      return(
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault(); //기본적인 동작 페이지 바뀜 방지
              this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc
              );
              // alert('submit!');
            }.bind(this)}
          >
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
              <input 
                type="text"
                name="title"
                placeholder="title"
                value={this.state.title}
                onChange = {this.inputFormHandler}
                // onChange = {function(e){
                //   console.log(e.target.value)
                //   this.setState({title:e.target.value})
                // }.bind(this)}
                ></input></p>
            <p>
              <textarea 
                onChange = {this.inputFormHandler}
                // onChange = {function(e){
                //   this.setState({desc:e.target.value})
                // }.bind(this)}
                name="desc" 
                placeholder="description" 
                value={ this.state.desc }></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

export default UpdateContent;