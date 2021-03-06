import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Article from './article'
import NewArticle from './newArticle'
import { searchKeyword } from './articleActions'

//Overall article views, include the new article part, the search bar and all articles
const ArticlesView = ({username, articles, dispatch}) => {  
  let keyword = ''
  return (
      <table className="card_table">
      <tbody>
        <NewArticle/>
        <tr>
          <td>
            <p><input type="text" className="searchfield" placeholder="Search Posts"
              ref={(node) => keyword = node }
              onChange={() => { dispatch(searchKeyword(keyword.value)) }}/></p>
          </td>
        </tr>
        { articles.sort((a,b) => {
          if (a.date < b.date)
            return 1
          if (a.date > b.date)
            return -1
          return 0
        }).map((article) =>
          <Article key={article._id} _id={article._id} username={username} author={article.author}
            date={article.date} text={article.text} img={article.img} avatar={article.avatar}
            comments={article.comments}/>
        )}
      </tbody>
      </table>
  )
}

ArticlesView.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    ...Article.propTypes
  }).isRequired).isRequired
}

export default connect(
  (state) => {
    const avatars = state.articles.avatars
    const keyword = state.articles.searchKeyword
    let articles = Object.keys(state.articles.articles).map((id) => state.articles.articles[id])
    if (keyword && keyword.length > 0) {
      articles = articles.filter((a) => {
        return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
               a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      })
    }
    articles = articles.map((a) => {
      return {...a, avatar: avatars[a.author], comments: a.comments.map((c) => {
        return { ...c, avatar: avatars[c.author] }
      })}
    })
    return {
      username: state.profile.username,
      articles
    }
  }
)(ArticlesView)

export { ArticlesView as PureArticlesView }


