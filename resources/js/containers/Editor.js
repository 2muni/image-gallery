import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { PostSubmit } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as articleActions from '../store/modules/article'
import { produce } from 'immer';

import tui from 'tui-editor'
import "tui-editor/dist/tui-editor-Editor.js";
require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css'); // editor ui
require('tui-editor/dist/tui-editor-contents.css'); // editor content
require('highlight.js/styles/vs2015.css'); // code block highlight

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        body: '',
        thumbnail: '',
        tags: '',
      }
    }

    this.handleSubmitCard = this.handleSubmitCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  tuiEditor(preview) {
    return this.editor = new tui({
      el: document.getElementById('editSection'),
      initialEditType: 'markdown',
      previewStyle: preview,
      height: 'calc(100% - 64px)',
      usageStatistics: false,
      events: {
        change: () => {
          console.log(this.state.post.body);
          this.setState(
            produce(this.state, draft => {
              draft.post['body'] = this.editor.getValue()
            })
          );
        }
      }
    })
  }

  componentDidMount() {
    document.body.clientWidth > 992 ? 
      this.tuiEditor('vertical') : this.tuiEditor('tab')
  } 

  handleSubmitCard(e) {
    const cn = /(post)/
    const isPost = cn.test(e.target.className);
    
    if(isPost)
      document.querySelector('.submit-wrapper').style.display = 'flex';
    else if(e.target.className === 'submit-wrapper')
      document.querySelector('.submit-wrapper').style.display = 'none'
  }

  handleChange(e) {
    this.setState(
      produce(this.state, draft => {
        draft.post[e.target.name] = e.target.value;
      })
    );
  }


  handleSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    data.append('user', 'teset');
    data.append('body', this.state.post.body);
    this.props.ArticleActions.postRequest(data)
  }
  
  render() {
    return ( 
      <div id="editor">
        <PostSubmit
            post={this.state.post}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSubmitCard={this.handleSubmitCard}
        />
        <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">temit</Link>
          <ul className="right">
          <li>
          <Button className="btn post" onClick={this.handleSubmitCard}>작성하기</Button>
          </li>
          </ul>
        </div>
        </nav>
        <div id="editSection"/>
      </div>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  postStatus: article.post
});

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);