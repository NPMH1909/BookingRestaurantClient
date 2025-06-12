import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const UpdateDialog = ({
  open,
  onClose,
  onSubmit,
  onReject,
  header,
  body,
  isUpdated,
  isOrder,
  size,
  overflow,
}) => (
  <Dialog
    fullWidth
    open={open}
    onClose={onClose}
    maxWidth={size}
    className={overflow ? "h-[80vh] overflow-auto" : ""}
  >
    <DialogTitle className="pb-0 flex justify-between">
      <Typography variant="h4">{header}</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>{body}</DialogContent>
    <DialogActions>
      <Button
            variant="gradient"
            color="green"
            onClick={onSubmit}
            loading={isUpdated}
          >
            {!isUpdated && <span>Xác nhận</span>}
          </Button>
      {isOrder && (
        <Button color="red" onClick={onReject} loading={isUpdated}>
          Từ chối
        </Button>
      )}
    </DialogActions>
  </Dialog>
);


export default UpdateDialog