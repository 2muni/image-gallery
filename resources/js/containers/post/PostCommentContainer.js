import React, { Component, Fragment } from 'react';
import { PostComments } from '../../components/post/PostComment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from '../../store/modules/article_comment'

import { produce } from 'immer'

class PostCommentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      list: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentRemove = this.handleCommentRemove.bind(this);
  }

  componentDidMount() {
    this.props.CommentActions.listRequest(this.props.article)
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.list = this.props.commentData;
      })
    ))
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentSubmit() {
    let data = new FormData();
    data.append('article_id', this.props.article);
    data.append('comment', this.state.comment);
    data.append('user_id', this.props.user.id);
    this.props.CommentActions.postRequest(data)
    .then(() => this.props.CommentActions.listRequest(this.props.article))
    .then(() => this.setState(
      produce(this.state, draft => {
        draft.comment = '';
        draft.list = this.props.commentData;
      })
    ))
  }

  handleCommentRemove(e) {
    if(this.props.user.id == e.target.dataset.user) {
      confirm("댓글을 삭제하시겠습니까?") && 
      this.props.CommentActions.removeRequest(e.target.dataset.id)
      .then(() => this.props.CommentActions.listRequest(this.props.article))
      .then(() => this.setState({ list: this.props.commentData }))
    }
  }

  render() {
    return(
      <Fragment>{this.props.commentData ?
        <PostComments
          user={this.props.user}
          comment={this.state.comment}
          list={this.state.list}
          handleChange={this.handleChange}
          handleCommentSubmit={this.handleCommentSubmit}
          handleCommentRemove={this.handleCommentRemove}
        /> : undefined}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  commentData: state.article_comment.list.data,
})

const mapDispatchToProps = (dispatch) => ({
  CommentActions: bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentContainer);