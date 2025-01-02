import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setUserInfo } from "../state/User/UserSlice";

interface NavbarProps {
  selectedCategory: string;
  categories: string[];
  setCategory: (category: string) => void;
}

const Navbar: FC<NavbarProps> = ({
  selectedCategory,
  categories,
  setCategory,
}) => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    dispatch(
      setUserInfo({
        name: "",
        email: "",
        token: "",
        preferences: {
          categories: [],
          sources: [],
          authors: [],
        },
      })
    );
  }

  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div
          className={`navbar-brand text-bold ${
            selectedCategory === "General" ? "active" : ""
          }`}
          onClick={() => setCategory("general")}
        >
          <span className="nav-link">CASE STUDY</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {categories.map((category: string, index: number) => (
              <li className="nav-item" key={index}>
                <div
                  className={`nav-link ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </div>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Launch static backdrop modal
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
