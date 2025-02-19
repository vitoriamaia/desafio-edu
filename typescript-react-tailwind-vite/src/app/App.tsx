import { Layout } from "@/app/Layout";
import { Authentication, Home, NoMatch, PageType } from "@/pages";
import { Student } from "@/pages/Student";
import Learning from "@/pages/disciplinas/biologia/Learning";
import Biologia from "@/pages/disciplinas/biologia/Page"; // Correctly import the Biologia component
import Questions from "@/pages/disciplinas/biologia/Questions";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Authentication">
            <Route path="login" element={<Authentication pageType={PageType.LOGIN} />} />
            <Route path="register" element={<Authentication pageType={PageType.REGISTER} />} />
          </Route>
          <Route path="Student" element={<Student />} />
          <Route path="disciplinas">
            <Route path="matematica" element={<Authentication pageType={PageType.LOGIN} />} />
            <Route path="biologia">
              <Route index element={<Biologia />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
