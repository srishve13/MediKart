import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    />
  );
};

export default Pagination;