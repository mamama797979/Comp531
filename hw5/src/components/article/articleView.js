import React from 'react'
import {connect} from 'react-redux'

import NewArticle from './newArticle'
import Article from './article'
import {searchKeyword} from './articleActions'


//Overall article views, include the new article part, the search bar and all articles

export const ArticleView = ({articleList, dispatch}) => {
  let keyword;
  return(
  <div>
    <NewArticle/>
    <br/>
    <div className="row text-center">
      <input rows="1" cols="20" placeholder="Search atricles" ref={(node)=>{keyword = node}}
      onChange={()=>{dispatch(searchKeyword(keyword.value))}}/>
    </div>
    {articleList.map((article) => <Article 
      key = {article._id}
      author = {article.author} 
      date = {article.date} 
      text = {article.text}
      img = {article.img}
      isDisplayComments = {article.isDisplayComments}
      comments = {article.comments}/>)
    }
  </div>
)}

export function filterFunction(articles, keyword){
  let articleList = Object.keys(articles).map((_id)=> articles[_id]).sort((a,b)=>a.date===b.date?0:a.date<b.date?1:-1);
  if(keyword && keyword.length !==0){
    articleList = articleList.filter((item)=>{
      return item.text.toLowerCase().indexOf(keyword.toLowerCase()) >=0 ||
           item.author.toLowerCase().indexOf(keyword.toLowerCase()) >=0
    })
  }
  return articleList;
}

export default connect((state)=>{
  return {
    articleList: filterFunction(state.articles.articles, state.articles.keyword)
  }
})(ArticleView)