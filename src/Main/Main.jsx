import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components';

import ExamCategory from '../Pages/ExamCategory'
import Grades from '../Pages/Grades'
import Marks from '../Pages/Marks'
import OfflineExam from '../Pages/OfflineExam'
import Promotion from '../Pages/Promotion'
import Marksheet from '../Pages/Marksheet'
import PageNotFound from '../Pages/PageNotFound';


const Container = styled.div`
  height: 90vh;
  overflow: scroll;

  .mainScroll::-webkit-scrollbar {
    display: none;
  }

`;

const Main = () => {


  const role = localStorage.getItem('loggedInUserRole');

  return (
    <>
      <Container className='mainScroll'>
        <Routes>
          <Route path='/examCategory' element={<ExamCategory />} />
          <Route path='/grades' element={<Grades />} />
          <Route path='/marks' element={<Marks />} />
          <Route path='/offlineExam' element={<OfflineExam />} />
          <Route path='/marksheet' element={<Marksheet />} />
          <Route path='/promotion' element={<Promotion />} />
          {/* Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default Main
