import { useEffect, useState, FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { Article } from "../types"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import { RootState } from "../state/store"
import { getArticles } from "../services"
import Pagination from "./Pagination"

interface NewsAreaProps {
  category: string
}

const NewsArea: FC<NewsAreaProps> = ({ category }) => {
  const user = useSelector((state: RootState) => state.user.user)
  
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState({} as Record<string, string>)
  const [keyword, setKeyword] = useState<string>("")
  const [pagination, setPagination] = useState<{ page: number; pageSize: number; totalPages: number } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  
  const handleGetArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getArticles(user.token, query)
      if (response.message.includes("No records found")) {
        setArticles([]);
        setPagination(null);
        setErrorMessage("No articles found!");
      } else {
        setArticles(response.data);
        setPagination({
          page: response.page,
          pageSize: response.pageSize,
          totalPages: Math.floor(response.total_results / response.pageSize),
        });
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [user.token, query])

  const handleSetSortby = (value: string) => {
    setQuery({ ...query, sort_by: value })
  }

  const searchKeyword = () => {
    if (keyword !== "") 
      setQuery({ ...query, keyword })
  }

  useEffect(() => {
    setQuery({ category })
  }, [category])

  useEffect(() => {
    handleGetArticles()
  }, [handleGetArticles])

  return (
    <div className="container">
      {loading && (
        <div className="p-5 text-center">
          <Spinner />
        </div>
      )}
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="dropdown mt-2">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort By:
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSetSortby("published_at")}
                >
                  Date
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSetSortby("category")}
                >
                  Category
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleSetSortby("source")}
                >
                  Source
                </button>
              </li>
            </ul>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="d-flex mt-2"
            style={{ width: "30%" }}
            role="search"
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Enter keyword"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={searchKeyword}>
              Search
            </button>
          </form>
        </div>

        {user.preferences.categories.map(
          (preference: string, index: number) => (
            <span className="badge bg-primary mx-1" key={index}>
              {preference}
            </span>
          )
        )}
      </div>
      {errorMessage !== "" && (
        <div className="mt-5">
          <p>{errorMessage}</p>
        </div>
      )}
      {articles.map((article: Article, index: number) => (
        <NewsItem key={index} article={article} />
      ))}

      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page: number) =>
            setQuery({ ...query, page: page.toString() })
          }
        />
      )}
    </div>
  )
}

export default NewsArea
