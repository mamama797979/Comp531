import Action, {resource} from '../../actions'

//Actions related articles


export function getArticles() {
    return (dispatch, getState) => {
        return resource('GET', 'articles')
        .then((response)=>{
            const articles = response.articles.reduce((object,item) => {
                object[item._id] = item;
                return object;
            },{})
            dispatch({type:Action.UPDATE_ARTICLES, articles});
        })
    }
}

export function createNewArticles(){
    return {type:Action.ERRORMSG, errorMsg:"Creating new articles is not functional yet!"};
}

export function searchKeyword(keyword){
    return {type:Action.SEARCH_KEYWORD, keyword};
}