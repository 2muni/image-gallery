import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../store/modules/article'
import { Post, Preloader } from '../components'

class Article extends Component {

  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.props.ArticleActions.getRequest(this.props.match.params.id)
  }

  handleRemove() {
    if(this.props.status.id === this.props.articleData.user.id) {
      confirm("게시글을 삭제하시겠습니까?") && 
      this.props.ArticleActions.removeRequest(this.props.match.params.id);
    }
  }
//<Post article={this.state.data}/>
//div className="article-wrapper"
  render() {
    return(
      <div className="article-wrapper">
        {this.props.articleData ?
          <Post
            user={this.props.status.id}
            article={this.props.articleData}
            handleRemove={this.handleRemove}
            /> :
          <Preloader/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status,
  articleData: state.article.get.data
})

const mapDispatchToProps = (dispatch) => ({
  ArticleActions: bindActionCreators(articleActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);