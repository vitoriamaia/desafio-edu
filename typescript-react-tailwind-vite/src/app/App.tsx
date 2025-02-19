import { Layout } from "@/app/Layout";
import { Authentication, Home, NoMatch, PageType } from "@/pages";
import { Student } from "@/pages/Student";
import Learning from "@/pages/disciplinas/biologia/Learning";
import Biologia from "@/pages/disciplinas/biologia/Page"; // Correctly import the Biologia component
import Questions from "@/pages/disciplinas/biologia/Questions";
import Filosofia from "@/pages/disciplinas/filosofia/Page";
import Fisica from "@/pages/disciplinas/fisica/Page";
import Geografia from "@/pages/disciplinas/geografia/Page";
import Historia from "@/pages/disciplinas/historia/Page";
import Matematica from "@/pages/disciplinas/matematica/Page";
import Quimica from "@/pages/disciplinas/quimica/Page";
import Sociologia from "@/pages/disciplinas/sociologia/Page";
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
            <Route path="Filosofia">
              <Route index element={<Filosofia />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Fisica">
              <Route index element={<Fisica />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Geografia">
              <Route index element={<Geografia />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Historia">
              <Route index element={<Historia />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Matematica">
              <Route index element={<Matematica />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Quimica">
              <Route index element={<Quimica />} />
              <Route path="Learning" element={<Learning />} />
              <Route path="Questions" element={<Questions />} />

            </Route>
            <Route path="Sociologia">
              <Route index element={<Sociologia />} />
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
