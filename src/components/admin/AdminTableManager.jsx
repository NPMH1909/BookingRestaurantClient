import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from "@material-tailwind/react";
import Table from "../admin/Table";
import Tablist from "../admin/Tablist";
import { Toast } from "../../configs/SweetAlert2";
import Swal from "sweetalert2";
import useOpen from "../../hooks/useOpen";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AdminTableManager = ({
  name,
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
  isUpdated,
  isOrder,
  pagination,
  page,
  setPage,
  setStatus,
  updateSubmit,
  rejectSubmit,
}) => {
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
    handleDetailClose,
    handleUpdateClose,
    handleDeleteClose,
    data,
    handleData,
  } = useOpen();

  const handleDeleteConfirm = () => {
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
  };

  const handleUpdateSubmit = async () => {
    try {
      const message = await updateSubmit();
      if (message?.status === 200 || message?.data?.status === 200) {
        Toast.fire({ icon: "success", title: "Cập nhật thành công" });
        handleUpdateClose();
      }
    } catch {
      Toast.fire({ icon: "error", title: "Cập nhật thất bại" });
    }
  };

  const handleRejectOrder = async () => {
    try {
      const message = await rejectSubmit();
      if (message?.status === 200 || message?.data?.status === 200) {
        Toast.fire({ icon: "success", title: "Từ chối thành công" });
        handleUpdateClose();
      }
    } catch {
      Toast.fire({ icon: "error", title: "Từ chối thất bại" });
    }
  };

  useEffect(() => {
    if (deleteOpen) {
      handleDeleteConfirm();
    }
  }, [deleteOpen]);

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-5">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          {name}
        </Typography>
      </div>

      {tablist && <Tablist TABS={tablist} setStatus={setStatus} />}

      <Table
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        active={page}
        setActive={setPage}
        handleUpdateOpen={handleUpdateOpen}
        handleDeleteOpen={handleDeleteOpen}
        handleDetailOpen={noDetail ? undefined : handleDetailOpen}
        updateContent={updateContent}
        deleteContent={deleteContent}
        noDelete={noDelete}
        noUpdate={noUpdate}
        data={data}
        handleData={handleData}
        maxPage={pagination.number_of_pages}
      />

      {/* Dialogs */}
      <Dialog fullWidth open={detailOpen} onClose={handleDetailClose} maxWidth={size} className={overflow ? "h-[95vh] overflow-auto" : ""}>
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">{headerDetail}</Typography>
          <IconButton onClick={handleDetailClose}><XMarkIcon className="w-5 h-5" /></IconButton>
        </DialogTitle>
        <DialogContent>{bodyDetail}</DialogContent>
        <div className="flex justify-end gap-2 px-6 pb-4">
          {!noUpdate && (
            <Button color="green" onClick={() => { handleDetailClose(); handleUpdateOpen(); }}>
              Cập nhật
            </Button>
          )}
          {!noDelete && (
            <Button color="red" onClick={() => { handleDetailClose(); handleDeleteOpen(); }}>
              Xóa
            </Button>
          )}
        </div>
      </Dialog>

      <Dialog fullWidth open={updateOpen} onClose={handleUpdateClose} maxWidth={sizeUpdate} className={updateOverflow ? "h-[80vh] overflow-auto" : ""}>
        <DialogTitle className="pb-0 flex justify-between">
          <Typography variant="h4">{headerUpdate}</Typography>
          <IconButton onClick={handleUpdateClose}><XMarkIcon className="w-5 h-5" /></IconButton>
        </DialogTitle>
        <DialogContent>{bodyUpdate}</DialogContent>
        <DialogActions>
          <Button color="green" onClick={handleUpdateSubmit} loading={isUpdated}>
            {!isUpdated && <span>Xác nhận</span>}
          </Button>
          {isOrder && (
            <Button color="red" onClick={handleRejectOrder} loading={isUpdated}>
              Từ chối
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminTableManager;
