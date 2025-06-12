import React, { useEffect, useState } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
  Container,
} from "@mui/material";

import Swal from "sweetalert2";
import { Toast } from "../../configs/SweetAlert2";

import Tablist from "./Tablist";
import AdminTableSection from "./AdminTableSection";
import DetailDialog from "./DetailDialog";
import UpdateDialog from "./UpdateDialog";

import useOpen from "../../hooks/useOpen";

const Dashboard = ({
  name,
  children,
  tablist,
  TABLE_HEAD,
  TABLE_ROWS,
  noDelete,
  noUpdate,
  noDetail,
  updateContent,
  deleteContent,
  headerDetail,
  bodyDetail,
  headerUpdate,
  bodyUpdate,
  size,
  sizeUpdate,
  overflow,
  updateOverflow,
  updateSubmit,
  rejectSubmit,
  handleDeleteSubmit,
  isUpdated,
  isOrder,
  pagination,
  page,
  setPage,
  setStatus,
}) => {
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    data,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
    handleDetailClose,
    handleUpdateClose,
    handleDeleteClose,
    handleData,
  } = useOpen();

  useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#2962ff",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteSubmit();
        }
        handleDeleteClose();
      });
    }
  }, [deleteOpen]);

  const handleUpdateSubmit = async () => {
    try {
      const message = await updateSubmit();
      console.log('message', message)
      if (message?.status === 200 || message?.data?.status === 200) {
        Toast.fire({ icon: "success", title: "Cập nhật thành công" });
        handleUpdateClose();
      }
    } catch (err) {
      console.log("error", err);
      Toast.fire({ icon: "error", title: "Cập nhật thất bại" });
    }
  };


  const handleRejectOrder = async () => {
    try {
      const message = await rejectSubmit();
      if (message?.status === 200 || message?.data?.status === 200) {
        Toast.fire({ icon: "success", title: "Cập nhật thành công" });
        handleUpdateClose();
      }
    } catch (err) {
      console.log("error", err);
      Toast.fire({ icon: "error", title: "Cập nhật thất bại" });
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="h4" color="blue-gray" className="font-bold">
            {name}
          </Typography>
          {children}
        </div>

        {tablist && <Tablist TABS={tablist} setStatus={setStatus} />}

        <AdminTableSection
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          page={page}
          setPage={setPage}
          handleUpdateOpen={handleUpdateOpen}
          handleDeleteOpen={handleDeleteOpen}
          handleDetailOpen={handleDetailOpen}
          updateContent={updateContent}
          deleteContent={deleteContent}
          noDelete={noDelete}
          noUpdate={noUpdate}
          data={data}
          handleData={handleData}
          maxPage={pagination?.totalPages}
          noDetail={noDetail}
        />
      </Container>

      <DetailDialog
        open={detailOpen}
        onClose={handleDetailClose}
        onUpdate={() => {
          handleDetailClose();
          handleUpdateOpen();
        }}
        onDelete={() => {
          handleDetailClose();
          handleDeleteOpen();
        }}
        header={headerDetail}
        body={bodyDetail}
        noDelete={noDelete}
        noUpdate={noUpdate}
        size={size}
        overflow={overflow}
      />

      <UpdateDialog
        open={updateOpen}
        onClose={handleUpdateClose}
        onSubmit={handleUpdateSubmit}
        onReject={handleRejectOrder}
        header={headerUpdate}
        body={bodyUpdate}
        isUpdated={isUpdated}
        isOrder={isOrder}
        size={sizeUpdate}
        overflow={updateOverflow}
      />
    </>
  );
};

export default Dashboard;
