import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, imageUrl, newsUrl,author,date}= this.props;
    return (
      <div>
        <div className="card">
  <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XFoY08VjVjA2s80O7gPJ3L4iCDPA0jfWdw&usqp=CAU":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</p>
    <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div> 
      </div>
    )
  }
}

export default NewsItem
