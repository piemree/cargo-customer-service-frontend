import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import request from 'src/request';
import { Link } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';

const Dashboard = () => {
  const [state, setState] = useState([]);
  const [deliveredCargos, setDeliveredCargos] = useState([]);
  const [tickets, setTickets] = useState([]);

  const { getUser } = useGlobals();
  const user = getUser();

  async function getAllTickets() {
    request
      .get('/ticket/getAllActiveTickets')
      .then((response) => {
        setTickets(response.data.data);
      })
      .catch(console.log);
  }
  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mx-4 mb-4">
            <CCardHeader>
              <h5>Destek Talepleri</h5>
            </CCardHeader>
            <CCardBody className="p-4">
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                bordered
              >
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Başlık</CTableHeaderCell>
                    <CTableHeaderCell>Konu</CTableHeaderCell>
                    <CTableHeaderCell>Kimden</CTableHeaderCell>
                    <CTableHeaderCell>Son Mesaj</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tickets?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{item?.title}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item?.subject}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item?.messages[item?.messages.length - 1]?.sender}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item?.messages[item?.messages.length - 1]?.message}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/ticket/${item?._id}`}>
                          <CButton color="primary">Cevapla</CButton>
                        </Link>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
