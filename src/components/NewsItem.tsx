import { FC } from "react"
import { Article } from "../types"
import { setSelectedArticleId } from "../state/Article/ArticleSlice"
import genericNews from "../assets/images/generic-news.jpg"
import { useDispatch } from "react-redux"

interface NewsItemProps {
  article: Article;
}

const NewsItem: FC<NewsItemProps> = ({ article }) => {
  const dispatch = useDispatch()
  const handleSetSelectedArticleId = () => {
    dispatch(setSelectedArticleId(article.id.toString()))
  }

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block m-3"
      style={{ width: "18rem" }}
    >
      <img
        src={article.thumbnail !== "" ? article.thumbnail : genericNews}
        style={{ height: "200px", width: "343" }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{article.title.slice(0, 15)}</h5>
        <p className="card-text">
          {article.content ? article.content.slice(0, 90) : "No description"}
        </p>
        <button
          className="btn btn-primary"
          onClick={handleSetSelectedArticleId}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsItem
