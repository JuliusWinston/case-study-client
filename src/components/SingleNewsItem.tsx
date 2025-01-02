import { useEffect, useState, useCallback } from "react"
import { Article } from "../types"
import { formatDateTime } from "../utils"
import { getArticle } from "../services"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import genericNews from "../assets/images/generic-news.jpg";
import { setSelectedArticleId } from "../state/Article/ArticleSlice"

const SingleNewsItem = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const article = useSelector((state: RootState) => state.article.id)

  const [loading, setLoading] = useState<boolean>(false)
  const [fetchedArticle, setFetchedArticle] = useState({} as Article)

  const dispatch = useDispatch();

  const handleGetArticle = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getArticle(user.token, article)
      setFetchedArticle(response.data);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [user.token, article])

  const handleGoBack = () => {
    dispatch(setSelectedArticleId(""));
    setFetchedArticle({} as Article)
  }

  useEffect(() => {
    handleGetArticle()
  }, [handleGetArticle])

  return (
    <div className="container w-full p-2">
      {loading ? (
        <div className="p-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-grid gap-2 col-6 mx-auto mb-2">
            <button className="btn btn-primary" type="button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        <div className="card" style={{ width: "100%" }}>
          <img
            src={
              fetchedArticle.thumbnail !== ""
                ? fetchedArticle.thumbnail
                : genericNews
            }
            className="card-img-top"
            alt="article-image"
          />
          <div className="card-body">
            <h4 className="card-title">{fetchedArticle.title}</h4>
            <span className="badge bg-primary my-2 me-2">
              {fetchedArticle.source}
            </span>
            <span className="badge bg-success my-2">
              {fetchedArticle.category}
            </span>
            <h6>
              {
                formatDateTime(fetchedArticle?.published_at?.toString()).split(
                  ","
                )[0]
              }
            </h6>
            <p className="card-text">{fetchedArticle.content}</p>
          </div>
          <div className="card-footer">
            <span>Author: {fetchedArticle.author}</span>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleNewsItem
