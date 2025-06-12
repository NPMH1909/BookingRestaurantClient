import React from 'react'
import Table from './Table';

const AdminTableSection = ({
  TABLE_HEAD,
  TABLE_ROWS,
  page,
  setPage,
  handleUpdateOpen,
  handleDeleteOpen,
  handleDetailOpen,
  updateContent,
  deleteContent,
  noDelete,
  noUpdate,
  data,
  handleData,
  maxPage,
  noDetail
}) => {
  return (
    <Table
      TABLE_HEAD={TABLE_HEAD}
      TABLE_ROWS={TABLE_ROWS}
      active={page}
      setActive={setPage}
      handleUpdateOpen={handleUpdateOpen}
      handleDeleteOpen={handleDeleteOpen}
      handleDetailOpen={!noDetail ? handleDetailOpen : undefined}
      updateContent={updateContent}
      deleteContent={deleteContent}
      noDelete={noDelete}
      noUpdate={noUpdate}
      data={data}
      handleData={handleData}
      maxPage={maxPage}
    />
  );
};


export default AdminTableSection