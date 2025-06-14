import { Route, Routes } from "react-router";
import "./App.css";
import { SyncLoader } from "react-spinners";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const AutoDetailsPage = lazy(() =>
  import("./pages/AutoDetailsPage/AutoDetailsPage")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <Suspense
        fallback={<SyncLoader color="#3470FF" size={20} className="loader" />}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<AutoDetailsPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
