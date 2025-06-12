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
const DetailDialog = ({
  open,
  onClose,
  onUpdate,
  onDelete,
  header,
  body,
  noDelete,
  noUpdate,
  size,
  overflow
}) => (
  <Dialog
    fullWidth
    open={open}
    onClose={onClose}
    maxWidth={size}
    className={overflow ? "h-[95vh] overflow-auto" : ""}
  >
    <DialogTitle className="pb-0 flex justify-between">
      <Typography className="text-xl font-bold">{header}</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>{body}</DialogContent>
    <div className="flex items-center justify-end">
      {!noUpdate && (
        <DialogActions>
          <Button color="green" onClick={onUpdate}>Cập nhật</Button>
        </DialogActions>
      )}
      {!noDelete && (
        <DialogActions>
          <Button color="red" onClick={onDelete}>Xóa</Button>
        </DialogActions>
      )}
    </div>
  </Dialog>
);


export default DetailDialog