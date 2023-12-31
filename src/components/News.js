import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps={
        country : 'in',
        pageSize : 8,
        category : 'general',
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
        
    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading : true,
            page : 1,
            totalResults: 0
        };
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=96114b03db3b4b06832fe953bda1e637&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(50);
        this.setState({
            articles : parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        }) 
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

fetchMoreData = async() =>{
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=96114b03db3b4b06832fe953bda1e637&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles : this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        }) 
    
};

  render() {
    return (
        <>
      
        <h2 className='text-center' style={{marginTop:'90px'}} >GlobalDaily - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length < this.state.totalResults}
        loader={ <Spinner/>}
        >

        <div className="container">
        <div className="row">
        {this.state.articles.map((element, index)=>{
            const uniqueKey = element.url + index;
            return <div className="col-md-4 my-3" key={uniqueKey}>
            <NewsItem title = {element.title?element.title:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
