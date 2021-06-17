import React, { Component } from 'react';

class TOC extends Component {
    //가장먼저 shouldComponentUpdate 실행함
    //다음props 와 현재 props를 비교해 렌더링 할지 말지 정해줌
    shouldComponentUpdate(newProps, newState) {
        console.log('===> TOC shouldComponentUpdate')
        if(this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/"+data[i].id}
                        data-id={ data[i].id }   //속성을 이용하는 방법
                        onClick={function(e){
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);   //속성을 이용하는 방법   //bind(this) 사용
                            // this.props.onChangePage(id);    //bind()에 추가하여 사용하는 방법 //bind(this, data[i].id)
                        }.bind(this)}
                        >{data[i].title}</a>
                </li>);

            i = i + 1;
        }

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC; //다른곳에서도 TOC class 사용하게 