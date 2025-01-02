import { useEffect, useState } from "react"
import { AuthForm, Navbar, NewsArea, SingleNewsItem } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

const App = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const article = useSelector((state: RootState) => state.article)

  const [category, setCategory] = useState<string>('General')
  const categories = [
    "Technology",
    "Business",
    "Entertainment",
    "Bitcoins",
    "Sport",
    "Finance",
    "Health",
  ]

  useEffect(() => {
    console.log('User: ', user)
  }, [user])

  return (
    <div className="vh-100">
      {user.token && 
        <Navbar
          selectedCategory={category}
          categories={categories}
          setCategory={setCategory}
        />
      }
      {user.token && article.id === "" && <NewsArea category={category} />}
      {user.token && article.id && <SingleNewsItem />}
      {!user.token && <AuthForm />}
    </div>
  );
}

export default App