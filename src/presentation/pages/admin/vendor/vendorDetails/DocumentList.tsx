// DocumentList.tsx
import React from 'react';
import { Box, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { IVendor } from '@/domain/entities/IVendor';

interface DocumentListProps {
  documents: IVendor['documents'];
  documentStatus: { [key: string]: 'approved' | 'rejected' };
  onStatusChange: (docType: string, isChecked: boolean) => void;
  onImageClick: (imageUrl: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  documentStatus,
  onStatusChange,
  onImageClick,
}) => {
  return (
    <>
      {documents?.map((doc, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">{doc.type?.toUpperCase()}</Typography>
          <Grid container spacing={2}>
            {doc.imageUrl?.map((image, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <img
                  src={`${image}`}
                  alt={doc.type ?? 'Document'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    cursor: 'pointer',
                    maxWidth: '300px',
                    maxHeight: '200px',
                  }}
                  onClick={() => onImageClick(`${image}`)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={documentStatus[doc.type as string] === 'approved'}
                    onChange={(e) => onStatusChange(doc.type as string, e.target.checked)}
                  />
                }
                label="Mark as Accepted"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default DocumentList;
