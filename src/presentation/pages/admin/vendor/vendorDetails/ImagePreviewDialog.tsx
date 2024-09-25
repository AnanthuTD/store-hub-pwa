// ImagePreviewDialog.tsx
import React from 'react';
import { Dialog } from '@mui/material';

interface ImagePreviewDialogProps {
  previewImage: string | null;
  onClose: () => void;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({ previewImage, onClose }) => {
  return (
    <Dialog open={!!previewImage} onClose={onClose} fullWidth>
      <img
        src={previewImage as string}
        alt="Document Preview"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </Dialog>
  );
};

export default ImagePreviewDialog;
